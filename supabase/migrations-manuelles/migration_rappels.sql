-- Rappel quotidien par push web (issue #16) : un abonnement par navigateur (PWA), lié au compte.
-- À coller une fois dans Supabase Cloud > SQL Editor (appliqué aussi à la base locale de dev).
-- La fonction send-reminders lit cette table avec la clé service (hors RLS) et l'envoie à l'heure choisie.

create table if not exists public.push_subscriptions (
  endpoint text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  p256dh text not null,
  auth text not null,
  remind_at time not null,
  time_zone text not null,
  -- Texte de la notification, dans la langue de l'interface au moment de l'enregistrement
  title text not null,
  body text not null,
  -- Date locale (dans time_zone) du dernier rappel envoyé : un seul par jour
  last_sent date,
  updated_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;
grant select, insert, update, delete on public.push_subscriptions to authenticated;
-- La fonction send-reminders (clé service) lit, date et supprime les abonnements
grant select, update, delete on public.push_subscriptions to service_role;

-- Chaque utilisateur connecté ne lit et n'écrit que ses propres abonnements. Les visiteurs anonymes n'ont aucun accès.
drop policy if exists "abonnements personnels" on public.push_subscriptions;
create policy "abonnements personnels" on public.push_subscriptions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
