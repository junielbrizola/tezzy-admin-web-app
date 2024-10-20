/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const options = await prisma.option.findMany()
    return NextResponse.json({ options })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error fetching options' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  try {
    if (!body?.name || body?.name === "") {
      return NextResponse.json({ error: 'Nome da opção é obrigatório' }, { status: 400 })
    }
    if (!body?.type || body?.type === "") {
      return NextResponse.json({ error: 'Tipo da opção é obrigatório' }, { status: 400 })
    }
    const option = await prisma.option.create({
      data: body,
    })
    return NextResponse.json({ option })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error creating option' }, { status: 500 })
  }
}
