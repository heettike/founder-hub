import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tweets = await prisma.tweet.findMany({
    orderBy: { dateAdded: 'desc' },
  })

  return NextResponse.json(tweets)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, screenshotUrl, tweetUrl, notes } = body

    if (!tweetUrl) {
      return NextResponse.json(
        { error: 'Tweet URL is required' },
        { status: 400 }
      )
    }

    const tweet = await prisma.tweet.create({
      data: {
        content,
        screenshotUrl,
        tweetUrl,
        notes,
      },
    })

    return NextResponse.json(tweet, { status: 201 })
  } catch (error) {
    console.error('Error creating tweet:', error)
    return NextResponse.json(
      { error: 'Failed to create tweet' },
      { status: 500 }
    )
  }
}
