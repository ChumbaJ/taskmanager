import { prisma } from '@/shared/db/prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface IRequestBody {
    username: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const body: IRequestBody = await req.json();

        const hashedPassword = await bcrypt.hash(body.password, 12);

        const user = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email,
            }
        }, { status: 201 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json(
                    { status: 'error', message: 'Email is already taken' },
                    { status: 405 },
                );
            }
        }

        return NextResponse.json(
            { status: 'error', message: 'Internal server error' },
            { status: 500 },
        );
    }
}
