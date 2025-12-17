import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')

  const providers = await prisma.provider.findMany({
    where: category ? { category } : undefined,
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(providers)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, website, avgPrice, bestWorkUrl, category, subcategory, notes } = body

    if (!name || !website || !category) {
      return NextResponse.json(
        { error: 'Name, website, and category are required' },
        { status: 400 }
      )
    }

    const provider = await prisma.provider.create({
      data: {
        name,
        website,
        avgPrice,
        bestWorkUrl,
        category,
        subcategory,
        notes,
      },
    })

    return NextResponse.json(provider, { status: 201 })
  } catch (error) {
    console.error('Error creating provider:', error)
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    )
  }
}
