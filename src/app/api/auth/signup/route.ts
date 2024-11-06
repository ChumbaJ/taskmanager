import { withErrorHandler } from '@/shared/api/errors/ErrorHandler';
import { prisma } from '@/shared/db/prisma';
import { ApiResponse } from '@/shared/types/api';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DefaultUser } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestBody {
    username: string;
    email: string;
    password: string;
}

export const POST = withErrorHandler(async (req: NextRequest) => {
    const body: IRequestBody = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await prisma.user.create({
        data: {
            name: body.username,
            email: body.email,
            password: hashedPassword,
        },
    });

    return NextResponse.json<ApiResponse<Omit<DefaultUser, 'id'>>>({
        status: 'success',
        data: {
            name: user.name,
            email: user.email,
        }
    }, { status: 201 });
});