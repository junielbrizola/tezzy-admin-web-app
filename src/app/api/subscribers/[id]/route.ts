/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { id },
    })
    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 })
    }
    return NextResponse.json({ subscriber })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error fetching subscriber' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  const { email } = body
  try {
    const updatedSubscriber = await prisma.subscriber.update({
      where: { id },
      data: { email },
    })
    return NextResponse.json({ subscriber: updatedSubscriber })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error updating subscriber' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.subscriber.delete({
      where: { id },
    })
    return NextResponse.json({ subscriber: id })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error deleting subscriber' }, { status: 500 })
  }
}
