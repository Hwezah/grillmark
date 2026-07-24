# GrillMark

Marketing + storefront for **GrillMark** by Salvation Foods Ltd — honest
sausages and franks from Ntinda, Kampala. Built from the Claude design handoff.

## Stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** + **shadcn/ui** primitives
- **Supabase** — Auth + Postgres (via `@supabase/ssr`, cookie-based sessions)
- **React Context API** for auth + cart state

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values
npm run dev                  # http://localhost:3000
```

The app builds and renders **without** Supabase configured — auth and cart
persistence simply stay dormant until keys are present.

## Environment variables

Set these in `.env.local` locally and in **Vercel → Settings → Environment
Variables**:

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Public, safe in the browser |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Public, safe in the browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | **Server-only** — never `NEXT_PUBLIC` |

## Database

Apply the schema, triggers, RLS policies and seed data:

- Paste [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
  into the Supabase SQL editor, **or** run `supabase db push` with the CLI.

Then enable **Email** auth (Authentication → Providers → Email). Turn on
"Confirm email" for production.

## Project structure

```
app/                     App Router routes
  about/                 Our Story ("Butcher Shop") — ported from the handoff
  account/               Account page (auth) — ported from the handoff
  products|cart|order|…  Placeholder routes (designs pending)
  auth/callback/         Supabase email-confirm / OAuth callback
components/
  ui/                    shadcn primitives (button, input, label, dialog)
  layout/                navbar, footer, logo
  auth/auth-modals.tsx   Sign in / create / sign out (real Supabase)
  reveal.tsx             Scroll-reveal
  curve-dividers.tsx     Animated section dividers (ported)
context/
  auth-context.tsx       AuthProvider + useAuth
  cart-context.tsx       CartProvider + useCart (guest→DB merge on sign-in)
lib/supabase/            client / server / middleware (env-guarded)
supabase/migrations/     SQL schema + RLS + seed
```

## Assets to add

Binary assets from the handoff aren't in the repo yet. Drop them into
`public/uploads/` and wire them in:

- Logos: `grillmark-logo-*.png` — currently a text wordmark placeholder
  (`components/layout/logo.tsx`)
- Product photography
- `Peridot PE` brand font (`.otf`) — currently falls back to Hanken Grotesk

## Deployment

Vercel is connected to the GitHub repo. Pushes to a feature branch produce a
**Preview** deployment; merging to the production branch deploys production.
Real auth/data work once the Supabase env vars are set in Vercel.
