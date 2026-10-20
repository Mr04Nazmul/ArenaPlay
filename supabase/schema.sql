-- ArenaPlay initial secure multiplayer schema
create extension if not exists pgcrypto;
create table if not exists public.arena_rooms (
 id uuid primary key default gen_random_uuid(),
 game text not null check (game in ('chess','ludo')),
 status text not null default 'waiting' check (status in ('waiting','playing','finished')),
 host_id uuid not null references auth.users(id),
 guest_id uuid references auth.users(id),
 state jsonb not null default '{}'::jsonb,
 version integer not null default 0,
 created_at timestamptz not null default now(),
 constraint different_players check (guest_id is null or guest_id <> host_id)
);
create index if not exists arena_rooms_host_idx on public.arena_rooms(host_id);
create index if not exists arena_rooms_guest_idx on public.arena_rooms(guest_id);
alter table public.arena_rooms enable row level security;
create policy "members can read rooms" on public.arena_rooms for select to authenticated using (auth.uid() = host_id or auth.uid() = guest_id);
create policy "host can create room" on public.arena_rooms for insert to authenticated with check (auth.uid() = host_id and guest_id is null and status = 'waiting' and version = 0);
-- Do not permit client-side arbitrary state updates or dice outcomes.
-- Join and move operations must be implemented in server-side RPC with validation.
