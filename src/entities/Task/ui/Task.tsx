'use client'

import { Card, CardActionArea, CardContent, Box, Typography, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import cls from './Task.module.scss';
import { ITask } from '../model/types/TaskSchema';
import { useDeleteTaskMutation } from '../api/taskApi';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export const Task = ({ task }: { task: ITask }) => {
    const [ deleteTask, { isLoading } ] = useDeleteTaskMutation();

    const { setNodeRef, listeners, transform, attributes } = useDraggable({ id: task.id! });

    const style = { 
        transform: CSS.Translate.toString(transform),
        // transition: 'transform 1s out'
    };

    const handleDeleteTask = () => deleteTask(task);

    const createdAt = task.createdAt && new Date(task.createdAt).toLocaleDateString('ru');
    const endDate = task.endDate && new Date(task.endDate).toLocaleDateString('ru');

    return (
        <Box ref={setNodeRef} {...attributes} sx={style}>
            <Card className={cls.card}>
                <IconButton onClick={handleDeleteTask} className={cls.card__deleteIconButton}>
                    <DeleteIcon className={cls.card__deleteIcon}/>
                </IconButton>
                <CardActionArea {...listeners} className={cls.card__actionArea}>
                    <Box className={cls.card__header}>
                        <Typography
                            className={cls.card__title}
                            variant='body1'
                        >{task.name}</Typography>
                        <Chip
                            className={cls.chip}
                            label={task.priority}
                            variant='filled'
                        />
                    </Box>
                    <CardContent className={cls.card__content}>
                        <Box className={cls.card__box}>
                            <Typography className={cls.card__box__title}>Date added:</Typography>
                            <Typography className={cls.card__box__content}>{createdAt}</Typography>
                        </Box>
                        <Box className={cls.card__box}>
                            <Typography className={cls.card__box__title}>Date end:</Typography>
                            <Typography className={cls.card__box__content}>{endDate}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}
