-- Arrivage schema for Supabase (Postgres).
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.suppliers (
  id       text primary key,
  name     text not null,
  country  text,
  region   text,
  contact  text,
  email    text,
  terms    text,
  lead     integer default 6,          -- lead time in weeks
  note     jsonb  default '{"en":"","fr":""}'
);

create table if not exists public.wines (
  id       text primary key,
  sup      text not null references public.suppliers(id),
  name     text not null,
  vint     integer default 0,          -- 0 = non-vintage
  color    text check (color in ('red','white','rose','fortified')),
  cs       integer not null default 6, -- bottles per case
  cost     numeric(10,2) not null,     -- landed cost per bottle
  price    numeric(10,2) not null,     -- selling price per bottle, before tax
  stock    integer not null default 0, -- cases in the warehouse
  transit  integer not null default 0  -- cases on the way
);

create table if not exists public.shipments (
  id       text primary key,
  sup      text not null references public.suppliers(id),
  ref      text,
  cases    integer not null default 0,
  status   text not null check (status in ('production','sea','customs','received')),
  eta      date
);

create table if not exists public.accounts (
  id       text primary key,
  name     text not null,
  type     text check (type in ('resto','epicerie','caviste','hotel')),
  city     text,
  area     text,
  contact  text,
  email    text,
  pno      text,                       -- alcohol permit number
  pexp     date,                       -- permit expiry
  terms    text check (terms in ('net15','net30','cod')),
  since    integer,
  note     jsonb default '{"en":"","fr":""}'
);

create table if not exists public.orders (
  id       text primary key,
  acc      text not null references public.accounts(id),
  date     date not null default current_date,
  deliver  date,
  status   text not null check (status in ('draft','confirmed','delivered','paid')),
  lines    jsonb not null default '[]' -- [{"w": wine id, "c": cases}]
);

create table if not exists public.meta (
  id       text primary key,
  vals     jsonb
);

-- Confirm an order: refuse an expired permit, deduct stock, set the status.
-- Runs as one transaction, so two people confirming at once can't both draw the same stock.
create or replace function public.confirm_order(order_id text)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  o public.orders;
  a public.accounts;
  l jsonb;
begin
  select * into o from public.orders where id = order_id for update;
  if not found then raise exception 'Order % not found', order_id; end if;
  if o.status <> 'draft' then raise exception 'Only draft orders can be confirmed'; end if;
  select * into a from public.accounts where id = o.acc;
  if a.pexp is not null and a.pexp < current_date then
    raise exception 'The client''s permit has expired';
  end if;
  for l in select * from jsonb_array_elements(o.lines) loop
    update public.wines
       set stock = greatest(0, stock - (l->>'c')::int)
     where id = l->>'w';
  end loop;
  update public.orders set status = 'confirmed' where id = order_id;
end;
$$;

-- Delete an order. A confirmed order's cases go back into stock; a delivered or paid
-- order's stock is left as is, because the wine has already left the warehouse.
create or replace function public.delete_order(order_id text)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  o public.orders;
  l jsonb;
begin
  select * into o from public.orders where id = order_id for update;
  if not found then return; end if;
  if o.status = 'confirmed' then
    for l in select * from jsonb_array_elements(o.lines) loop
      update public.wines set stock = stock + (l->>'c')::int where id = l->>'w';
    end loop;
  end if;
  delete from public.orders where id = order_id;
end;
$$;

-- Row-level security: only signed-in users of this project can read or write.
-- Turn off public sign-ups (Authentication → Sign In / Providers) and invite your staff instead.
do $$
declare tb text;
begin
  foreach tb in array array['suppliers','wines','shipments','accounts','orders','meta'] loop
    execute format('alter table public.%I enable row level security', tb);
    execute format('drop policy if exists "team access" on public.%I', tb);
    execute format('create policy "team access" on public.%I for all to authenticated using (true) with check (true)', tb);
    execute format('grant select, insert, update, delete on public.%I to authenticated', tb);
  end loop;
end $$;

revoke execute on function public.confirm_order(text) from public, anon;
grant execute on function public.confirm_order(text) to authenticated;
revoke execute on function public.delete_order(text) from public, anon;
grant execute on function public.delete_order(text) to authenticated;

-- Live updates between users.
alter publication supabase_realtime add table
  public.suppliers, public.wines, public.shipments, public.accounts, public.orders, public.meta;
