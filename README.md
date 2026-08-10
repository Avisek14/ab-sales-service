# AB Sales & Service — Website + Lead/Consumer Progress Tracker

Next.js (App Router) site for AB Sales & Service, a TATA Power SolaRoof
Authorised Channel Partner. Includes the public marketing pages plus a
built-in tracker: team members manage leads through to installed
consumers, and customers check their own status via phone/OTP login.

## Pages

- `/` `/about` `/services` `/gallery` — marketing pages
- `/contact` — inquiry form → creates a lead via `POST /api/leads`
- `/track` → `/track/status` — customer phone/OTP login + status view
- `/dashboard/login` → `/dashboard` — team login + lead/consumer list with
  inline stage updates

## Data model

One shared `Lead` record moves through a single stage pipeline
(`lib/stages.ts`). Whether it's shown as a "lead" or a "consumer" is
just derived from how far along that pipeline it is — see
`recordType()` in `lib/stages.ts`.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables** — copy `.env.example` to `.env.local` and fill in:
   - `MONGODB_URI` — a MongoDB Atlas connection string (free tier is fine)
   - `NEXTAUTH_SECRET` — any random string (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` — `http://localhost:3000` for local dev
   - SMS and Cloudinary vars can stay blank for now (see below)

3. **Create your first team login**
   ```bash
   node scripts/create-admin.mjs "Your Name" you@example.com yourpassword
   ```

4. **Run it**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`. Team dashboard: `/dashboard/login`.

## Still stubbed — wire these in when ready

- **Customer OTP SMS** (`lib/sms.ts`) — currently just logs the code to
  the server console so you can test the flow for free. Swap in MSG91
  or Twilio and set `SMS_PROVIDER` / the relevant API key in `.env.local`.
- **Document/photo uploads** — models already have a `documents` array
  on each Lead, but there's no upload route yet. Cloudinary is the
  planned provider (env vars are already in `.env.example`).
- **Gallery photos** — `/gallery` currently renders placeholder tiles;
  swap `items` in `app/gallery/page.tsx` for real photo URLs once you
  have them (e.g. from Cloudinary).

## Deploying

Push to GitHub and import into Vercel. Add the same environment
variables there (Project Settings → Environment Variables), and update
`NEXTAUTH_URL` to your production domain.
