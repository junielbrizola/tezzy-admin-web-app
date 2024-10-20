/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const subscribers = await prisma.subscriber.findMany()
        return NextResponse.json({ subscribers })
    } catch (e: any) {
        console.log({ e })
        return NextResponse.json({ error: 'Error fetching subscribers' }, { status: 500 })
    }
}

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const { email } = body
    const isExistsSubscriber = await prisma.subscriber.findUnique({
        where: { email },
    })
    if (isExistsSubscriber) {
        return NextResponse.json({ error: 'E-mail já consta como assinante.' }, { status: 500 })
    }
    const subscriber = await prisma.subscriber.create({
      data: { email },
    })
    return NextResponse.json({ subscriber })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error creating subscriber' }, { status: 500 })
  }
}
