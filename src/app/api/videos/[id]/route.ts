import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.video.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ success: true })
}
