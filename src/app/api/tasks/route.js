import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {

  const tasks = await prisma.task.findMany();

  return NextResponse.json(tasks);
}

export async function POST(request) {

  const { name, description } = await request.json();

  await prisma.task.create({
    data: {
      name,
      description,
    }
  });

  return NextResponse.json({ message: "Tarea creada." }, { status: 201 });
}