import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const investor = await prisma.investor.findUnique({
    where: { id },
  })

  if (!investor) {
    return NextResponse.json({ error: 'Investor not found' }, { status: 404 })
  }

  return NextResponse.json(investor)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const investor = await prisma.investor.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(investor)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.investor.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}
