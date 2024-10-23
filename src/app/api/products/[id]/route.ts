/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ product })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: body,
    })
    return NextResponse.json({ product: updatedProduct })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.product.delete({
      where: { id },
    })
    return NextResponse.json({ product: id })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
  }
}
