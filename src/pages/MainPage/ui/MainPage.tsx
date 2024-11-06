'use client'

import { Box, Typography } from '@mui/material';
import { Task } from '@/entities/Task/index';
import cls from './MainPage.module.scss';
import { AddTaskForm } from '@/features/AddTaskForm/ui/AddTaskForm';
import { Column } from '@/entities/Column';
import { useGetTasksQuery } from '@/entities/Task/api/taskApi';
import { TaskStatus } from '@prisma/client';
import { ITask } from '@/entities/Task/model/types/TaskSchema';

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
    
    if (error) return <div>ERROR</div>

    return (
        <>
            <Typography
                className={cls.title}
                variant='h2'
            >
                Project name
            </Typography>
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
            <AddTaskForm/>
        </>
    );
}; 