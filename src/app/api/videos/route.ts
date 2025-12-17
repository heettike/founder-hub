import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { dateAdded: 'desc' },
  })

  return NextResponse.json(videos)
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

    const video = await prisma.video.create({
      data: {
        title,
        url,
        notes,
      },
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}
