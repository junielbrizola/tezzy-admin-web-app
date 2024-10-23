/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ user })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  try {
    let { name, email, password, type } = body
    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      if (existingUser) {
        return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 400 })
      }  
    }
    if (password) {
      password = await bcrypt.hash(password, 10)
    }
    const updateUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name: name || user?.name,
        email: email || user?.email,
        password: password || user?.password,
        type: type || user?.type,
      },
    })
    const { password: _, ...userWithoutPassword } = updateUser
    return NextResponse.json({ user: userWithoutPassword })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Erro durante o registro' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.user.delete({
      where: { id },
    })
    return NextResponse.json({ user: id })
  } catch (e: any) {
    console.log({ e })
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
  }
}
