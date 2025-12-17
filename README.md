# Noice Ecosystem - Founder Resource Hub

A password-protected web app for Noice ecosystem founders containing curated resources, investor profiles, and a marketplace of service providers.

## Features

- **Password Protection**: Simple password gate (password: `12345`)
- **Investors Page**: Grid layout with filters for Liquid Funds, Angels, and VCs
- **Resources Section**:
  - Articles with category filters
  - Embedded videos
  - Curated tweets
  - Podcast episodes
- **Attention Marketplace**: Service providers organized by category
  - Service Agencies
  - Podcasters & Streamers
  - Ghostwriters & Twitter Growth
  - Filmmakers & Creatives
  - Miscellaneous
- **Admin Interface**: Add and manage all content

## Tech Stack

- Next.js 16 with App Router
- Tailwind CSS 4
- Prisma 7 with SQLite
- TypeScript

## Quick Deploy to Vercel

1. **Click the button below to deploy:**

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/heettike/founder-hub)

2. **Add Postgres Database** in Vercel:
   - Go to Storage tab → Create Database → Select Postgres
   - Environment variables will be auto-configured

3. **Initialize the database** (after first deployment):
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Set up the database:
```bash
# For PostgreSQL
npx prisma migrate deploy
npm run db:seed

# For SQLite (local dev only)
# - Change datasource in schema.prisma to "sqlite"
# - Set DATABASE_URL="file:./dev.db" in .env
npx prisma migrate dev
npm run db:seed
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) and enter password `12345`

## Admin Interface

Navigate to `/admin` to manage:
- Investor profiles
- Articles
- Videos
- Tweets
- Podcasts
- Service providers

## Database Schema

- `Investor`: name, pfpUrl, title, twitter, linkedin, category
- `Article`: title, url, category (pre_launch, ico_details, philosophy, project_updates)
- `Video`: title, url
- `Tweet`: content, screenshotUrl, tweetUrl
- `Podcast`: title, url
- `Provider`: name, website, avgPrice, bestWorkUrl, category, subcategory

## Design

Minimal, Stripe-like aesthetic with:
- Heavy whitespace
- Typography-focused
- Mobile-responsive
- Fast load times
