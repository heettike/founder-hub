# Deployment Guide - Founder Resource Hub

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add -A
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New Project"
   - Import `heettike/founder-hub`

3. **Add Postgres Database**
   - In your Vercel project, go to the "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Follow the prompts to create your database

4. **Vercel will automatically:**
   - Detect it's a Next.js project
   - Set up environment variables (DATABASE_URL and DIRECT_URL) from Postgres
   - Build and deploy your app

5. **Initialize the database**
   - After first deployment, go to your project settings
   - Under "Environment Variables", verify DATABASE_URL and DIRECT_URL are set
   - In your terminal, run:
   ```bash
   # Install Vercel CLI if you haven't
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link to your project
   vercel link

   # Pull environment variables
   vercel env pull .env.local

   # Run migrations
   npx prisma migrate deploy

   # Seed the database
   npx prisma db seed
   ```

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (first time)
vercel

# Follow prompts to:
# - Link to existing project or create new
# - Confirm settings

# Add Postgres:
# 1. Go to your project in Vercel dashboard
# 2. Add Postgres database from Storage tab
# 3. Database URLs will be automatically added as environment variables

# Deploy to production
vercel --prod
```

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/heettike/founder-hub.git
cd founder-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Choose your database setup

#### Option A: SQLite (Easier for local dev)
```bash
# Edit .env
DATABASE_URL="file:./dev.db"
DIRECT_URL="file:./dev.db"

# Edit prisma/schema.prisma - change datasource to:
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

# Run migrations
npx prisma migrate dev

# Seed the database
npm run db:seed
```

#### Option B: PostgreSQL (Production-like)
```bash
# Get a free PostgreSQL database from:
# - Vercel Postgres
# - Neon (https://neon.tech)
# - Supabase (https://supabase.com)

# Add to .env:
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Run migrations
npx prisma migrate deploy

# Seed the database
npm run db:seed
```

### 4. Run the development server
```bash
npm run dev
```

Visit http://localhost:3000 (password: `12345`)

## Environment Variables

The app requires these environment variables:

- `DATABASE_URL` - PostgreSQL connection string (Vercel Postgres provides this automatically)
- `DIRECT_URL` - Direct database connection (Vercel Postgres provides this automatically)

## Post-Deployment

### Access the admin panel
- Navigate to `/admin` to start adding content
- Your intern can use this interface to manage all data

### Customize
- Change password in `src/components/PasswordGate.tsx`
- Update branding in `src/app/page.tsx`
- Modify categories in respective admin pages

## Troubleshooting

### "Environment variable not found: DATABASE_URL"
- Make sure you've added the Postgres database in Vercel
- Check that environment variables are set in your Vercel project settings
- For local dev, make sure `.env` file exists with proper values

### Database connection issues
- Verify your DATABASE_URL is correct
- For Vercel Postgres, make sure you're using the DIRECT_URL for migrations
- Check that your database is accessible from your deployment region

### Build fails
- Run `npm run build` locally to test
- Check for TypeScript errors
- Verify all dependencies are in package.json

## Need Help?

Check these resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
