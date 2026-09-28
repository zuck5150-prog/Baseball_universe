create extension if not exists pgcrypto;

create table universes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default 'GM',
  user_team_id text,
  current_season integer not null,
  current_day integer not null default 1,
  seed text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table universe_players (
  id uuid primary key default gen_random_uuid(),
  universe_id uuid not null references universes(id) on delete cascade,
  player_key text not null,
  mlb_person_id bigint,
  team_key text,
  level text,
  state jsonb not null default '{}',
  unique(universe_id, player_key)
);

create table games (
  id uuid primary key default gen_random_uuid(),
  universe_id uuid not null references universes(id) on delete cascade,
  game_key text not null,
  season integer not null,
  day integer not null,
  away_team_key text not null,
  home_team_key text not null,
  status text not null default 'SCHEDULED',
  boxscore jsonb,
  unique(universe_id, game_key)
);

create index games_universe_day on games(universe_id, season, day);

create table player_season_stats (
  id uuid primary key default gen_random_uuid(),
  universe_id uuid not null references universes(id) on delete cascade,
  season integer not null,
  player_key text not null,
  batting jsonb not null default '{}',
  pitching jsonb not null default '{}',
  unique(universe_id, season, player_key)
);

create table health_states (
  id uuid primary key default gen_random_uuid(),
  universe_id uuid not null references universes(id) on delete cascade,
  player_key text not null,
  fatigue integer not null default 0,
  injured boolean not null default false,
  injury jsonb,
  updated_day integer not null default 1,
  unique(universe_id, player_key)
);

create table world_events (
  id uuid primary key default gen_random_uuid(),
  universe_id uuid not null references universes(id) on delete cascade,
  season integer not null,
  day integer not null,
  event_type text not null,
  priority text not null,
  title text not null,
  context jsonb not null default '{}',
  resolved boolean not null default false
);

create table character_memories (
  id uuid primary key default gen_random_uuid(),
  universe_id uuid not null references universes(id) on delete cascade,
  character_key text not null,
  season integer not null,
  day integer not null,
  kind text not null,
  summary text not null,
  emotional_weight integer not null default 0,
  context jsonb not null default '{}'
);
