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

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) and enter password `12345`

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
