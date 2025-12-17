#!/bin/bash
set -e

echo "🚀 Production Database Initialization Script"
echo "=============================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Login to Vercel
echo "📝 Logging into Vercel..."
vercel login

# Link to project
echo "🔗 Linking to Vercel project..."
vercel link

# Pull environment variables
echo "⬇️  Pulling environment variables from Vercel..."
vercel env pull .env.production

# Load production env vars
export $(cat .env.production | grep -v '^#' | xargs)

echo ""
echo "Running database migrations..."
echo "This will create all the necessary tables in your production database."
echo ""

# Run migrations
npx prisma migrate deploy

echo ""
echo "✅ Migrations completed successfully!"
echo ""
echo "Next step: Seed the database with sample data"
echo "Run: npm run db:seed"
echo ""
