// Builds the Android APK while sparing the PC.
// Automatically detects the cores, the current CPU load and the free RAM, then:
//  - limits the number of Gradle workers and the JVM memory,
//  - runs Gradle at "below normal" priority (the rest of the PC stays smooth),
//  - does not use the Gradle daemon (nothing stays in memory after the build).
// Usage : npm run apk            (build web hors ligne + sync Capacitor + APK debug)
//         npm run apk:release    (same thing, then signed .aab and .apk for publishing, issue #17)
//         node scripts/build-android.mjs --gradle-only
import os from 'node:os';
import { spawn, execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const androidDir = path.join(root, 'android');
const isWin = process.platform === 'win32';

// --- 1. Measuring the machine ---------------------------------------------
function cpuBusyRatio(sampleMs = 1000) {
  const snap = () => os.cpus().map((c) => c.times);
  const a = snap();
  const end = Date.now() + sampleMs;
  while (Date.now() < end) { /* short busy wait, measurement only */ }
  const b = snap();
  let idle = 0;
  let total = 0;
  b.forEach((t, i) => {
    const d = (k) => t[k] - a[i][k];
    idle += d('idle');
    total += d('user') + d('nice') + d('sys') + d('idle') + d('irq');
  });
  return total > 0 ? 1 - idle / total : 0;
}

const cores = os.availableParallelism?.() ?? os.cpus().length;
const busy = cpuBusyRatio();
const freeGb = os.freemem() / 1024 ** 3;

// At most 1/4 of the truly free cores, between 1 and 4 workers
const freeCores = Math.max(1, Math.floor(cores * (1 - busy)));
const workers = Math.min(4, Math.max(1, Math.floor(freeCores / 4)));
// Gradle JVM: ~20 % of the free RAM, between 1 and 3 GB
const heapMb = Math.round(Math.min(3072, Math.max(1024, freeGb * 1024 * 0.2)));

console.log(
  `Machine: ${cores} cores (${Math.round(busy * 100)} % busy), ${freeGb.toFixed(1)} GB of free RAM`
);
console.log(`Build:   ${workers} Gradle worker(s), JVM ${heapMb} MB, low priority, no daemon\n`);

// --- 2. Android environment -----------------------------------------------
function findJavaHome() {
  const candidates = [
    process.env.JAVA_HOME,
    isWin && 'C:\\Program Files\\Android\\Android Studio\\jbr',
    !isWin && '/Applications/Android Studio.app/Contents/jbr/Contents/Home',
  ].filter(Boolean);
  return candidates.find((p) => existsSync(path.join(p, 'bin', isWin ? 'java.exe' : 'java')));
}

function findSdk() {
  const candidates = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    isWin && process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk'),
    !isWin && path.join(os.homedir(), 'Library', 'Android', 'sdk'),
    !isWin && path.join(os.homedir(), 'Android', 'Sdk'),
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p));
}

const javaHome = findJavaHome();
const sdk = findSdk();
if (!javaHome) throw new Error('JDK not found: install Android Studio or set JAVA_HOME.');
if (!sdk) throw new Error('Android SDK not found: install it with Android Studio or set ANDROID_HOME.');

// local.properties expects "/" ("\" are escape characters)
writeFileSync(path.join(androidDir, 'local.properties'), `sdk.dir=${sdk.replaceAll('\\', '/')}\n`);

const env = { ...process.env, JAVA_HOME: javaHome, ANDROID_HOME: sdk };

// Release build: refuse to build without a key, rather than ship an unsigned package
const release = process.argv.includes('--release');
const keystore = path.join(os.homedir(), '.svenskacore', 'keystore.properties');
if (release && !existsSync(keystore)) {
  console.error(`${keystore} not found: create the signing key (see "Signed Android release" in README.md).`);
  process.exit(1);
}

// --- 3. Offline web build + Capacitor sync -------------------------------
function runLowPriority(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = isWin
      ? // "start /belownormal": the priority is inherited by java.exe started by gradlew.bat
        spawn('cmd.exe', ['/c', 'start', '"build"', '/belownormal', '/wait', '/b', cmd, ...args], {
          cwd, env, stdio: 'inherit', windowsVerbatimArguments: true,
        })
      : spawn('nice', ['-n', '10', cmd, ...args], { cwd, env, stdio: 'inherit' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} failed (code ${code})`))));
  });
}

if (!process.argv.includes('--gradle-only')) {
  console.log('> Web build (offline mode) and Capacitor sync');
  execSync('npx tsc -b && npx vite build --mode android && npx cap sync android', {
    cwd: root, env, stdio: 'inherit',
  });
}

// --- 4. APK ----------------------------------------------------------------
const tasks = release ? ['bundleRelease', 'assembleRelease'] : ['assembleDebug'];
console.log(`\n> Gradle ${tasks.join(' ')}`);
await runLowPriority(
  isWin ? 'gradlew.bat' : './gradlew',
  [
    ...tasks,
    '--no-daemon',
    `--max-workers=${workers}`,
    // Arguments passed as is on Windows: quotes needed because of the space
    isWin
      ? `"-Dorg.gradle.jvmargs=-Xmx${heapMb}m -XX:+UseSerialGC"`
      : `-Dorg.gradle.jvmargs=-Xmx${heapMb}m -XX:+UseSerialGC`,
    '-Dorg.gradle.parallel=false',
    '-Dkotlin.compiler.execution.strategy=in-process',
    '--console=plain',
    '-q',
  ],
  androidDir
);

const outputs = path.join(androidDir, 'app', 'build', 'outputs');
const files = release
  ? [path.join(outputs, 'bundle', 'release', 'app-release.aab'), path.join(outputs, 'apk', 'release', 'app-release.apk')]
  : [path.join(outputs, 'apk', 'debug', 'app-debug.apk')];
const missing = files.filter((f) => !existsSync(f));
if (missing.length) {
  console.error(`\nFailed: not found ${missing.join(', ')} (see the Gradle errors above).`);
  process.exit(1);
}
for (const f of files) console.log(`${release ? 'Signed' : 'APK ready'}: ${f}`);
