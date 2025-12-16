import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')

  const investors = await prisma.investor.findMany({
    where: category && category !== 'all' ? { category } : undefined,
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(investors)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, pfpUrl, title, twitter, linkedin, category } = body

  const investor = await prisma.investor.create({
    data: {
      name,
      pfpUrl,
      title,
      twitter,
      linkedin,
      category,
    },
  })

  return NextResponse.json(investor, { status: 201 })
}
