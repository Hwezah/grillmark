-- ============================================================================
-- GrillMark — initial schema, triggers, and Row-Level Security
-- Source of truth: AUTH_SUPABASE.md. Run in the Supabase SQL editor
-- (or `supabase db push`). Prices are whole UGX shillings (no minor unit).
-- ============================================================================

-- ---------- PRODUCTS ----------
create table if not exists public.products (
  id           text primary key,            -- e.g. 'beef-sausages'
  name         text not null,
  category     text not null check (category in ('sausage','frank')),
  tag          text,
  description  text,
  price_500g   integer not null,            -- UGX
  price_1kg    integer not null,            -- UGX
  image_path   text,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ---------- PROFILES (1:1 with auth.users) ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  area       text,
  created_at timestamptz not null default now()
);

-- ---------- CART ITEMS (one row per user+product+size) ----------
create table if not exists public.cart_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  text not null references public.products(id),
  size        text not null check (size in ('500g','1kg')),
  qty         integer not null check (qty > 0),
  updated_at  timestamptz not null default now(),
  unique (user_id, product_id, size)
);

-- ---------- ORDERS ----------
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users(id) on delete set null,
  status         text not null default 'pending'
                   check (status in ('pending','confirmed','paid','delivered','cancelled')),
  full_name      text not null,
  phone          text not null,
  area           text not null,
  notes          text,
  subtotal       integer not null,
  discount       integer not null default 0,
  coupon_code    text,
  total          integer not null,
  payment_method text default 'momo',
  payment_ref    text,
  created_at     timestamptz not null default now()
);

create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  product_id  text not null references public.products(id),
  name        text not null,
  size        text not null,
  qty         integer not null,
  unit_price  integer not null,
  line_total  integer not null
);

-- ---------- COUPONS (validated server-side) ----------
create table if not exists public.coupons (
  code        text primary key,
  percent_off integer not null check (percent_off between 1 and 100),
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---------- NEWSLETTER SUBSCRIBERS ----------
create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ---------- keep cart_items.updated_at fresh ----------
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists cart_items_touch on public.cart_items;
create trigger cart_items_touch before update on public.cart_items
  for each row execute function public.touch_updated_at();

-- ---------- auto-create a profile on sign-up ----------
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Row-Level Security
-- ============================================================================
alter table public.products    enable row level security;
alter table public.profiles    enable row level security;
alter table public.cart_items  enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.coupons     enable row level security;
alter table public.subscribers enable row level security;

-- PRODUCTS: anyone can read active products; writes are admin-only (service_role bypasses RLS)
drop policy if exists "products readable" on public.products;
create policy "products readable" on public.products
  for select using (active = true);

-- COUPONS: anyone can read active coupons (validation still recomputed server-side)
drop policy if exists "coupons readable" on public.coupons;
create policy "coupons readable" on public.coupons
  for select using (active = true);

-- SUBSCRIBERS: insert-only from the client
drop policy if exists "subscribe insert" on public.subscribers;
create policy "subscribe insert" on public.subscribers
  for insert with check (true);

-- PROFILES: owner-only
drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
drop policy if exists "own profile insert" on public.profiles;
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- CART: owner-only, all actions
drop policy if exists "own cart" on public.cart_items;
create policy "own cart" on public.cart_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ORDERS: owner can read + create their own
drop policy if exists "own orders read" on public.orders;
create policy "own orders read" on public.orders for select using (auth.uid() = user_id);
drop policy if exists "own orders insert" on public.orders;
create policy "own orders insert" on public.orders for insert with check (auth.uid() = user_id);

-- ORDER ITEMS: gated through the parent order's ownership
drop policy if exists "own order items read" on public.order_items;
create policy "own order items read" on public.order_items for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
drop policy if exists "own order items insert" on public.order_items;
create policy "own order items insert" on public.order_items for insert
  with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- ============================================================================
-- Seed data — catalog + launch coupons (safe to re-run)
-- ============================================================================
insert into public.products (id, name, category, tag, description, price_500g, price_1kg, image_path) values
  ('beef-sausages',    'Beef Sausages',    'sausage', 'Bestseller', 'Honest beef, boldly seasoned. No fillers.',      17500, 35000, 'products/pack-beef-sausage-cut.png'),
  ('chicken-sausages', 'Chicken Sausages', 'sausage', 'Lean',       'Lean chicken links with a clean, savoury bite.', 16500, 33000, 'products/pack-chicken-sausage-cut.png'),
  ('beef-franks',      'Beef Franks',      'frank',   null,          'Smoky beef franks with a proper snap.',          18000, 36000, 'products/pack-beef-frank-cut.png'),
  ('chicken-franks',   'Chicken Franks',   'frank',   null,          'Tender chicken franks, smoked slow.',            17000, 34000, 'products/pack-chicken-frank-cut.png')
on conflict (id) do nothing;

insert into public.coupons (code, percent_off) values
  ('GRILL5', 5),
  ('FIRSTGRILL', 10)
on conflict (code) do nothing;
