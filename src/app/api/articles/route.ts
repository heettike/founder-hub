import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')

  const articles = await prisma.article.findMany({
    where: category && category !== 'all' ? { category } : undefined,
    orderBy: { dateAdded: 'desc' },
  })

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, url, category } = body

  const article = await prisma.article.create({
    data: {
      title,
      url,
      category,
    },
  })

  return NextResponse.json(article, { status: 201 })
}
