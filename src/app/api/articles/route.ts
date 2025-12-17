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
  try {
    const body = await request.json()
    const { title, url, category, notes } = body

    if (!title || !url || !category) {
      return NextResponse.json(
        { error: 'Title, URL, and category are required' },
        { status: 400 }
      )
    }

    const article = await prisma.article.create({
      data: {
        title,
        url,
        category,
        notes,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
