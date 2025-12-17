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
  try {
    const body = await request.json()
    const { name, pfpUrl, title, twitter, linkedin, category, notes } = body

    if (!name || !title || !category) {
      return NextResponse.json(
        { error: 'Name, title, and category are required' },
        { status: 400 }
      )
    }

    const investor = await prisma.investor.create({
      data: {
        name,
        pfpUrl,
        title,
        twitter,
        linkedin,
        category,
        notes,
      },
    })

    return NextResponse.json(investor, { status: 201 })
  } catch (error) {
    console.error('Error creating investor:', error)
    return NextResponse.json(
      { error: 'Failed to create investor' },
      { status: 500 }
    )
  }
}
