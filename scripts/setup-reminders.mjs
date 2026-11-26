// Sets up web push reminders on Supabase Cloud (issue #16). Steps: "Daily reminders" in README.md.
// Prerequisite: npx supabase login. Run only once: new VAPID keys make
// existing subscriptions unusable (everyone would have to turn their reminder on again).
//   node scripts/setup-reminders.mjs mailto:you@example.com --yes
// (--yes is passed to the CLI: it requires this confirmation to change the hosted project)
// 1. generates the VAPID key pair and the function's call secret;
// 2. stores them as function secrets (the private key only goes there);
// 3. writes the public key into .env.production (VITE_VAPID_PUBLIC_KEY);
// 4. deploys the send-reminders function;
// 5. writes the scheduling SQL into supabase/rappels-cron.sql.local (ignored by git: it contains the call secret).
import { createECDH, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const [subject, ...cliArgs] = process.argv.slice(2);
if (!subject?.startsWith('mailto:')) {
  console.error('Usage: node scripts/setup-reminders.mjs mailto:you@example.com');
  process.exit(1);
}

const envFile = '.env.production';
const env = readFileSync(envFile, 'utf8');
const ref = /VITE_SUPABASE_URL=https:\/\/([a-z0-9]+)\.supabase\.co/.exec(env)?.[1];
if (!ref) throw new Error(`VITE_SUPABASE_URL not found in ${envFile}`);

const ecdh = createECDH('prime256v1');
ecdh.generateKeys();
const publicKey = ecdh.getPublicKey().toString('base64url');
const privateKey = ecdh.getPrivateKey().toString('hex').padStart(64, '0');
const privateB64 = Buffer.from(privateKey, 'hex').toString('base64url');
const cronSecret = randomBytes(32).toString('hex');

const supabase = (...args) => {
  const r = spawnSync('npx', ['supabase', ...args, '--project-ref', ref, ...cliArgs], { stdio: 'inherit', shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

supabase(
  'secrets',
  'set',
  `VAPID_PUBLIC_KEY=${publicKey}`,
  `VAPID_PRIVATE_KEY=${privateB64}`,
  `VAPID_SUBJECT=${subject}`,
  `CRON_SECRET=${cronSecret}`,
);

const line = `VITE_VAPID_PUBLIC_KEY=${publicKey}`;
writeFileSync(
  envFile,
  /^VITE_VAPID_PUBLIC_KEY=.*$/m.test(env) ? env.replace(/^VITE_VAPID_PUBLIC_KEY=.*$/m, line) : env.trimEnd() + '\n' + line + '\n',
);
console.log(`\nPublic key written to ${envFile}.`);

supabase('functions', 'deploy', 'send-reminders', '--no-verify-jwt');

const cronFile = 'supabase/rappels-cron.sql.local';
writeFileSync(
  cronFile,
  `-- Reminder scheduling (issue #16), every 5 minutes. Contains the call secret: do not commit.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select vault.create_secret('${cronSecret}', 'rappels_cron_secret');
select cron.schedule('rappels-quotidiens', '*/5 * * * *', $$
  select net.http_post(
    url := 'https://${ref}.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object('Authorization', 'Bearer ' ||
      (select decrypted_secret from vault.decrypted_secrets where name = 'rappels_cron_secret')),
    -- 5 s by default: too short for a cold start of the function
    timeout_milliseconds := 30000
  )
$$);
`,
);
console.log(`
Scheduling SQL written to ${cronFile}.`);
