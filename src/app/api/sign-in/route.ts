/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const { email, password } = body
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (user && await bcrypt.compare(password, user.password) && user.type === "CLIENT") {
      const token = await new SignJWT({ id: user.id, email: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))

      return NextResponse.json({ user, token })
    }
    return NextResponse.json({ error: 'E-mail ou senha inválidos' }, { status: 401 })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Erro durante autenticação' }, { status: 500 })
  }
}
