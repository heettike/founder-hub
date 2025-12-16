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
  const body = await request.json()
  const { name, website, avgPrice, bestWorkUrl, category, subcategory } = body

  const provider = await prisma.provider.create({
    data: {
      name,
      website,
      avgPrice,
      bestWorkUrl,
      category,
      subcategory,
    },
  })

  return NextResponse.json(provider, { status: 201 })
}
