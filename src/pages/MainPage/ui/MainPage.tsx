'use client'

import { Box, Typography } from '@mui/material';
import { Task } from '@/entities/Task/index';
import { Column } from '@/entities/Column/ui/Column';
import cls from './MainPage.module.scss';

export const MainPage = () => {
    return (
        <>
            <Typography
                className={cls.title}
                variant='h2'
            >
                Project name
            </Typography>
            <Box className={cls.columns}>
                <Column label='To do'>
                    <Task/>
                    <Task/>
                    <Task/>
                </Column>
                <Column label='In progress'></Column>
                <Column label='Done'></Column>
                <Column label='Frozen'></Column>
            </Box>
        </>
    );
}; 