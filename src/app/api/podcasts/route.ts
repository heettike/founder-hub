import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const podcasts = await prisma.podcast.findMany({
    orderBy: { dateAdded: 'desc' },
  })

  return NextResponse.json(podcasts)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, url, notes } = body

    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      )
    }

    const podcast = await prisma.podcast.create({
      data: {
        title,
        url,
        notes,
      },
    })

    return NextResponse.json(podcast, { status: 201 })
  } catch (error) {
    console.error('Error creating podcast:', error)
    return NextResponse.json(
      { error: 'Failed to create podcast' },
      { status: 500 }
    )
  }
}
