/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const option = await prisma.option.findUnique({
      where: { id },
    })
    if (!option) {
      return NextResponse.json({ error: 'Option not found' }, { status: 404 })
    }
    return NextResponse.json({ option })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error fetching option' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  try {
    if (!body?.name || body?.name === "") {
      return NextResponse.json({ error: 'Nome da opção é obrigatório' }, { status: 400 })
    }
    if (!body?.type || body?.type === "") {
      return NextResponse.json({ error: 'Tipo da opção é obrigatório' }, { status: 400 })
    }
    const updatedOption = await prisma.option.update({
      where: { id },
      data: body,
    })
    return NextResponse.json({ option: updatedOption })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error updating option' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.option.delete({
      where: { id },
    })
    return NextResponse.json({ option: id })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error deleting option' }, { status: 500 })
  }
}
