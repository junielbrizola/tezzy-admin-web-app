/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const { name, email, password, type } = body
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type: type || "CLIENT",
      },
    })
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({ user: userWithoutPassword })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Erro durante o registro' }, { status: 500 })
  }
}
