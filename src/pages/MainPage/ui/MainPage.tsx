'use client'

import { Box, Typography } from '@mui/material';
import { Task } from '@/entities/Task/index';
import cls from './MainPage.module.scss';
import { AddTaskForm } from '@/features/AddTaskForm/ui/AddTaskForm';
import { Column } from '@/entities/Column';
import { useGetTasksQuery, useUpdateTaskMutation } from '@/entities/Task/api/taskApi';
import { TaskStatus } from '@prisma/client';
import { ITask } from '@/entities/Task/model/types/TaskSchema';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';

const renderColumnContent = (tasks: ITask[] | undefined, isLoading: boolean, status: TaskStatus) => {
    if (isLoading) return <div>Loading...</div>

    return tasks!.filter(task => task.status === status)
        .map(task => (
            <Task
                key={task.id}
                task={task}
            />
        ))
            
}

export const MainPage = () => {
    const { data: tasks, isLoading, error } = useGetTasksQuery();
    const [ updateTask ] = useUpdateTaskMutation();

    const router = useRouter();

    if (error) return <div>ERROR</div>

    const handleOnDragEnd = (event: DragEndEvent) => {
        if (!event.over) return;

        const taskId = event.active.id;
        const currentTask = tasks?.data!.find(task => task.id === taskId)!

        if (event.over.id === currentTask.status) {
            router.push('/task');
            return;
        }

        const newStatus: TaskStatus = event.over.data.current ? event.over.data.current.status : null;

        if (!newStatus) return;

        updateTask({ id: taskId as string, task: { status: newStatus } })
    }

    return (
        <>
            <Typography
                className={cls.title}
                variant='h2'
            >
                Project name
            </Typography>
            <DndContext onDragEnd={handleOnDragEnd}>
                <Box className={cls.columns}>
                    <Column label={TaskStatus.TODO}>
                        {renderColumnContent(tasks?.data, isLoading, TaskStatus.TODO)}
                    </Column>
                    <Column label={TaskStatus.IN_PROGRESS}>
                        {renderColumnContent(tasks?.data, isLoading, TaskStatus.IN_PROGRESS)}
                    </Column>
                    <Column label={TaskStatus.DONE}>
                        {renderColumnContent(tasks?.data, isLoading, TaskStatus.DONE)}
                    </Column>
                    <Column label={TaskStatus.FROZEN}>
                        {renderColumnContent(tasks?.data, isLoading, TaskStatus.FROZEN)}
                    </Column>
                </Box>
            </DndContext>
            <AddTaskForm/>
        </>
    );
}; 