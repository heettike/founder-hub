import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const investor = await prisma.investor.findUnique({
    where: { id: params.id },
  })

  if (!investor) {
    return NextResponse.json({ error: 'Investor not found' }, { status: 404 })
  }

  return NextResponse.json(investor)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const investor = await prisma.investor.update({
    where: { id: params.id },
    data: body,
  })

  return NextResponse.json(investor)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.investor.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ success: true })
}
