/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import Ean from 'ean-generator';

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json({ products })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const ean = new Ean(['030', '031', '039'])
  try {
    const { type, custom, color, price, model, material, medias } = body
    const product = await prisma.product.create({
      data: { type, custom, ean: ean.create(), color, price, model, material, medias },
    })
    return NextResponse.json({ product })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
  }
}
