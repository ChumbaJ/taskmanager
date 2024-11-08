'use client'

import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import cls from './Column.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider/config/store';
import { addTaskActions } from '@/features/AddTaskForm/model/slice/addTaskFormSlice';
import React from 'react';
import { TaskStatus } from '@prisma/client';
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
    label: TaskStatus
    children?: React.ReactNode,
}

interface DropabbleData {
    status: TaskStatus
}

export const Column = (props: ColumnProps) => {
    const { label, children } = props;
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const { setNodeRef } = useDroppable({ 
        id: label,
        data: {
            status: label
        } as DropabbleData
    });

    const handleOpenAddTaskForm = () => dispatch(addTaskActions.openForm());

    return (
        <div ref={setNodeRef}>
            <Stack sx={{ background: theme.palette.background.block }} className={cls.column}>
                <Box className={cls.column__header}>
                    <Typography
                        className={cls.column__label}
                        variant='h6'
                        color={theme.palette.text.primary}
                    >{label}</Typography>
                    {label === TaskStatus.TODO ? (
                        <IconButton onClick={handleOpenAddTaskForm}>
                            <AddCircleIcon
                                sx={{
                                    color: theme.palette.success.main,
                                }}
                            />
                        </IconButton>
                    ) : (
                        null
                    )}
                </Box>
                <Box className={cls.column__content}>
                    { children }
                </Box>
            </Stack>
        </div>
    );
}