# Database Setup Guide

Your Vercel deployment is live, but the database tables haven't been created yet. Follow these steps to initialize your production database.

## The Issue

When trying to create articles or other content, you're seeing this error:
```
The table `public.Article` does not exist in the current database.
```

This is because Vercel deployed your application code, but the database migrations were never run to create the tables.

## Solution: Initialize Your Database

### Option 1: Quick Setup (Recommended)

Run this automated script from your local machine:

```bash
# Make sure you're in the project directory
cd /home/user/founder-hub

# Run the initialization script
bash scripts/init-production-db.sh
```

This script will:
1. Install/check for Vercel CLI
2. Log you into Vercel
3. Link to your project
4. Pull production environment variables
5. Run database migrations
6. Provide next steps for seeding

### Option 2: Manual Setup

If you prefer to run commands manually:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link to your project
vercel link
# Select your account and the "founder-hub" project

# 4. Pull production environment variables
vercel env pull .env.production

# 5. Run migrations to create tables
npx prisma migrate deploy

# 6. Seed the database with sample data
npm run db:seed
```

## What Gets Created

Running `prisma migrate deploy` will create these 6 tables in your PostgreSQL database:

1. **Investor** - VCs, angels, and liquid funds
2. **Article** - Curated articles with categories
3. **Video** - Launch videos and educational content
4. **Tweet** - Curated tweets
5. **Podcast** - Podcast episodes
6. **Provider** - Marketplace service providers

## Seeding Sample Data

After migrations complete, seed your database with 44 sample entries:

```bash
npm run db:seed
```

This adds:
- 8 investors with detailed notes
- 8 articles across different categories
- 5 videos
- 4 tweets
- 5 podcasts
- 14 marketplace providers (including Key KOLs and Market Makers)

## Verification

After setup, you should be able to:

1. Visit your admin pages:
   - https://your-app.vercel.app/admin
   - https://your-app.vercel.app/admin/investors
   - https://your-app.vercel.app/admin/articles
   - https://your-app.vercel.app/admin/providers

2. See sample data on the public pages:
   - https://your-app.vercel.app/investors
   - https://your-app.vercel.app/resources
   - https://your-app.vercel.app/marketplace

3. Add new entries through the admin interface without errors

## Troubleshooting

### "Can't reach database server"
- Make sure you've added PostgreSQL storage in your Vercel project
- Check that DATABASE_URL environment variable is set in Vercel

### "Not logged in to Vercel"
- Run `vercel login` and follow the authentication flow
- Make sure you're logged in with the correct account

### "Project not found"
- When running `vercel link`, select:
  - Scope: Your username/organization
  - Project: founder-hub
  - Link to existing: Yes

### "Migration failed"
- Check your production database URL is correct
- Ensure the database is accessible
- Try running migrations manually: `npx prisma migrate deploy`

## Next Steps

Once your database is initialized and seeded:

1. Your intern can start adding entries through `/admin` pages
2. All sample data will be visible in the UI
3. The marketplace categories (Key KOLs, Market Makers, etc.) will work properly
4. No more "table does not exist" errors

## Need Help?

If you run into any issues, check:
- Vercel project dashboard for database connection status
- Environment variables are properly set (DATABASE_URL, DIRECT_URL)
- Your PostgreSQL database is running and accessible
