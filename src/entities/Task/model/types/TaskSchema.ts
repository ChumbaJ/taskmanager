import { Priority, TaskStatus } from '@prisma/client';

export interface ITask {
    id?: string;
    name: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: Priority;
    endDate?: Date | null | string;
    createdAt?: Date
    userId?: string;
}

export interface TaskSchema {
    tasks: ITask[]
}
