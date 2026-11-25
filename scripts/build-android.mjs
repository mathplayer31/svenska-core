// Construit l'APK Android en ménageant le PC.
// Détecte automatiquement les cœurs, la charge CPU actuelle et la RAM libre, puis :
//  - limite le nombre de workers Gradle et la mémoire de la JVM,
//  - lance Gradle en priorité « inférieure à la normale » (le reste du PC reste fluide),
//  - n'utilise pas de daemon Gradle (rien ne reste en mémoire après le build).
// Usage : npm run apk            (build web hors ligne + sync Capacitor + APK debug)
//         npm run apk:release    (même chose, puis .aab et .apk signés pour la publication, issue #17)
//         node scripts/build-android.mjs --gradle-only
import os from 'node:os';
import { spawn, execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const androidDir = path.join(root, 'android');
const isWin = process.platform === 'win32';

// --- 1. Mesure de la machine ---------------------------------------------
function cpuBusyRatio(sampleMs = 1000) {
  const snap = () => os.cpus().map((c) => c.times);
  const a = snap();
  const end = Date.now() + sampleMs;
  while (Date.now() < end) { /* attente active courte, mesure seulement */ }
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

// Au plus 1/4 des cœurs réellement libres, entre 1 et 4 workers
const freeCores = Math.max(1, Math.floor(cores * (1 - busy)));
const workers = Math.min(4, Math.max(1, Math.floor(freeCores / 4)));
// JVM Gradle : ~20 % de la RAM libre, entre 1 et 3 Go
const heapMb = Math.round(Math.min(3072, Math.max(1024, freeGb * 1024 * 0.2)));

console.log(
  `Machine : ${cores} cœurs (${Math.round(busy * 100)} % occupés), ${freeGb.toFixed(1)} Go de RAM libre`
);
console.log(`Build    : ${workers} worker(s) Gradle, JVM ${heapMb} Mo, priorité basse, sans daemon\n`);

// --- 2. Environnement Android ---------------------------------------------
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
if (!javaHome) throw new Error('JDK introuvable : installe Android Studio ou définis JAVA_HOME.');
if (!sdk) throw new Error('SDK Android introuvable : installe-le via Android Studio ou définis ANDROID_HOME.');

// local.properties attend des « / » (les « \ » sont des caractères d'échappement)
writeFileSync(path.join(androidDir, 'local.properties'), `sdk.dir=${sdk.replaceAll('\\', '/')}\n`);

const env = { ...process.env, JAVA_HOME: javaHome, ANDROID_HOME: sdk };

// Version publiée : refuse de construire sans clé, plutôt que de livrer un paquet non signé
const release = process.argv.includes('--release');
const keystore = path.join(os.homedir(), '.svenskacore', 'keystore.properties');
if (release && !existsSync(keystore)) {
  console.error(`${keystore} introuvable : crée la clé de signature (procédure dans docs/HANDOFF.md).`);
  process.exit(1);
}

// --- 3. Build web hors ligne + synchronisation Capacitor --------------------
function runLowPriority(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = isWin
      ? // « start /belownormal » : la priorité est héritée par java.exe lancé par gradlew.bat
        spawn('cmd.exe', ['/c', 'start', '"build"', '/belownormal', '/wait', '/b', cmd, ...args], {
          cwd, env, stdio: 'inherit', windowsVerbatimArguments: true,
        })
      : spawn('nice', ['-n', '10', cmd, ...args], { cwd, env, stdio: 'inherit' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} a échoué (code ${code})`))));
  });
}

if (!process.argv.includes('--gradle-only')) {
  console.log('> Build web (mode hors ligne) et sync Capacitor');
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
    // Arguments passés tels quels sous Windows : guillemets nécessaires à cause de l'espace
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
  console.error(`\nÉchec : introuvable ${missing.join(', ')} (voir les erreurs Gradle ci-dessus).`);
  process.exit(1);
}
for (const f of files) console.log(`${release ? 'Signé' : 'APK prêt'} : ${f}`);
