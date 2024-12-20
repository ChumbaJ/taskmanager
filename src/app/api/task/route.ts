import { ITask } from '@/entities/Task/model/types/TaskSchema';
import { prisma } from '@/shared/db/prisma';
import { ApiResponse } from '@/shared/types/api';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth/[...nextauth]/auth';
import { ApiError } from '@/shared/api/errors/APIError';
import { withErrorHandler } from '@/shared/api/errors/ErrorHandler';
import { TaskStatus } from '@prisma/client';


export const GET = withErrorHandler(async (req: NextRequest) => {
    const session = await auth();
    if (!session) throw new ApiError('You are not logged in', 401); 

    const allTasks = await prisma.task.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return NextResponse.json<ApiResponse<ITask[]>>({
        status: 'success',
        data: allTasks,
    });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
    const session = await auth();
    if (!session) throw new ApiError('You are not logged in', 401);

    const requestBody: ITask = await req.json();

    const newTask = await prisma.task.create({
        data: {
            name: requestBody.name,
            description: requestBody.description,
            status: requestBody.status,
            priority: requestBody.priority,
            endDate: requestBody.endDate,
            userId: session.user.id,
        },
    });

    return NextResponse.json<ApiResponse<ITask>>(
        {
            status: 'success',
            data: newTask,
        },
        { status: 201 },
    );
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
    const session = await auth();
    if (!session) throw new ApiError('You are not logged in', 401); 

    const requestBody: { id: string, task: ITask } = await req.json();

    const updatedTask = await prisma.task.update({
        where: {
            id: requestBody.id,
        },
        data: {
            ...requestBody.task,
        },
    });

    return  NextResponse.json<ApiResponse<ITask>>({
        status: 'success',
        data: updatedTask,
    });

});

export const DELETE = withErrorHandler(async (req: NextRequest) => {
    const session = auth();
    if (!session) throw new ApiError('You are not logged in', 401);

    const requestBody: ITask = await req.json();

    const task = await prisma.task.delete({
        where: {
            id: requestBody.id
        }
    });

    return NextResponse.json<ApiResponse<ITask>>({
        status: 'success',
        data: task!,
        message: 'The task successfuly deleted'
    })
});