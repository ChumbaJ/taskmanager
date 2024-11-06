import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from './APIError';

export const withErrorHandler = (handler: (req: NextRequest) => Promise<NextResponse>) => async (req: NextRequest) => {
    try {
        return await handler(req);
    } catch(error) {
        if (error instanceof ApiError) return NextResponse.json({
            status: 'fail',
            message: error.message,
        }, { status: error.status });

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                if (error.meta && Array.isArray(error.meta.target)) {
                    const { target } = error.meta;
                    return NextResponse.json({
                        status: 'fail',
                        message: `Не удалось выполнить операцию: дубликат значения в поле ${target}`,
                        error,
                    }, { status: 400 })
                }
            }
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({
                status: 'fail',
                error,
                message: error.message
            });
        }

        return NextResponse.json({
            message: 'something went very very wrong',
            error,
        })
    }
}