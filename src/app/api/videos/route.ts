import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { dateAdded: 'desc' },
  })

  return NextResponse.json(videos)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, url } = body

  const video = await prisma.video.create({
    data: {
      title,
      url,
    },
  })

  return NextResponse.json(video, { status: 201 })
}
