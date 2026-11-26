-- Daily web push reminder (issue #16): one subscription per browser (PWA), tied to the account.
-- Paste once into Supabase Cloud > SQL Editor (also applied to the local dev database).
-- The send-reminders function reads this table with the service key (bypassing RLS) and sends it at the chosen time.

create table if not exists public.push_subscriptions (
  endpoint text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  p256dh text not null,
  auth text not null,
  remind_at time not null,
  time_zone text not null,
  -- Notification text, in the interface language at the time it was saved
  title text not null,
  body text not null,
  -- Local date (in time_zone) of the last reminder sent: only one per day
  last_sent date,
  updated_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;
grant select, insert, update, delete on public.push_subscriptions to authenticated;
-- The send-reminders function (service key) reads, dates and deletes subscriptions
grant select, update, delete on public.push_subscriptions to service_role;

-- Each signed-in user only reads and writes their own subscriptions. Anonymous visitors have no access.
drop policy if exists "abonnements personnels" on public.push_subscriptions;
create policy "abonnements personnels" on public.push_subscriptions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
