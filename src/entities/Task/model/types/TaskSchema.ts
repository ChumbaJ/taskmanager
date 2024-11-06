import { Priority, Task, TaskStatus } from '@prisma/client';

export interface ITask {
    id?: string;
    name: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: Priority;
    endDate?: Date | null;
    userId?: string;
}

export interface TaskSchema {
    tasks: Task[]
}
