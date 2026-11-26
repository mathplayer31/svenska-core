// Scheduled Supabase function (issue #16), called every 5 minutes by pg_cron.
// Sends the push reminder of each subscription whose time has passed today in its time zone,
// once a day, and deletes expired subscriptions (404 or 410 response from the push service).
// Secrets: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, CRON_SECRET (steps: "Daily reminders" in README.md).
import webpush from 'npm:web-push@3.6.7';
import { createClient } from 'npm:@supabase/supabase-js@2';

const env = (name: string) => {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`secret manquant : ${name}`);
  return v;
};

/** Local date 'YYYY-MM-DD' and time 'HH:MM' in the given time zone */
function localNow(timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}

Deno.serve(async (req) => {
  if (req.headers.get('authorization') !== `Bearer ${env('CRON_SECRET')}`) return new Response('interdit', { status: 401 });
  webpush.setVapidDetails(env('VAPID_SUBJECT'), env('VAPID_PUBLIC_KEY'), env('VAPID_PRIVATE_KEY'));
  const db = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'));

  const { data: subs, error } = await db.from('push_subscriptions').select('*');
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const result = { sent: 0, removed: 0, failed: 0 };
  for (const s of subs) {
    try {
      const now = localNow(s.time_zone);
      if (s.last_sent === now.date || now.time < s.remind_at.slice(0, 5)) continue;
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        JSON.stringify({ title: s.title, body: s.body }),
        { TTL: 4 * 3600 },
      );
      await db.from('push_subscriptions').update({ last_sent: now.date }).eq('endpoint', s.endpoint);
      result.sent++;
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      if (status === 404 || status === 410) {
        await db.from('push_subscriptions').delete().eq('endpoint', s.endpoint);
        result.removed++;
      } else {
        console.error(s.endpoint.slice(0, 60), e);
        result.failed++;
      }
    }
  }
  return Response.json(result);
});
