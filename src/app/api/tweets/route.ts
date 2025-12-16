import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tweets = await prisma.tweet.findMany({
    orderBy: { dateAdded: 'desc' },
  })

  return NextResponse.json(tweets)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { content, screenshotUrl, tweetUrl } = body

  const tweet = await prisma.tweet.create({
    data: {
      content,
      screenshotUrl,
      tweetUrl,
    },
  })

  return NextResponse.json(tweet, { status: 201 })
}
