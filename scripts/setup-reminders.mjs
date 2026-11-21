// Mise en place des rappels push web sur Supabase Cloud (issue #16). Procédure : docs/HANDOFF.md.
// Prérequis : npx supabase login. À lancer une seule fois : de nouvelles clés VAPID rendent
// inutilisables les abonnements déjà pris (chacun devrait réactiver son rappel).
//   node scripts/setup-reminders.mjs mailto:adresse@exemple.fr --yes
// (--yes est transmis au CLI : il exige cette confirmation pour modifier le projet hébergé)
// 1. génère la paire de clés VAPID et le secret d'appel de la fonction ;
// 2. les enregistre comme secrets de la fonction (la clé privée ne va que là) ;
// 3. écrit la clé publique dans .env.production (VITE_VAPID_PUBLIC_KEY) ;
// 4. déploie la fonction send-reminders ;
// 5. écrit le SQL de planification dans supabase/rappels-cron.sql.local (ignoré par git : il contient le secret d'appel).
import { createECDH, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const [subject, ...cliArgs] = process.argv.slice(2);
if (!subject?.startsWith('mailto:')) {
  console.error('Usage : node scripts/setup-reminders.mjs mailto:adresse@exemple.fr');
  process.exit(1);
}

const envFile = '.env.production';
const env = readFileSync(envFile, 'utf8');
const ref = /VITE_SUPABASE_URL=https:\/\/([a-z0-9]+)\.supabase\.co/.exec(env)?.[1];
if (!ref) throw new Error(`VITE_SUPABASE_URL introuvable dans ${envFile}`);

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
console.log(`\nClé publique écrite dans ${envFile}.`);

supabase('functions', 'deploy', 'send-reminders', '--no-verify-jwt');

const cronFile = 'supabase/rappels-cron.sql.local';
writeFileSync(
  cronFile,
  `-- Planification des rappels (issue #16), toutes les 5 minutes. Contient le secret d'appel : ne pas commiter.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select vault.create_secret('${cronSecret}', 'rappels_cron_secret');
select cron.schedule('rappels-quotidiens', '*/5 * * * *', $$
  select net.http_post(
    url := 'https://${ref}.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object('Authorization', 'Bearer ' ||
      (select decrypted_secret from vault.decrypted_secrets where name = 'rappels_cron_secret')),
    -- 5 s par défaut : trop court pour un démarrage à froid de la fonction
    timeout_milliseconds := 30000
  )
$$);
`,
);
console.log(`
SQL de planification écrit dans ${cronFile}.`);
