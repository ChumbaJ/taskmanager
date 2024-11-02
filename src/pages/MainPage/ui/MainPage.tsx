'use client'

import { signOut } from 'next-auth/react';
import Task from '@/entities/Task/ui/Task';
import { Typography } from '@mui/material';
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
            <Task/>
            <button onClick={() => signOut()}>Logout</button>
        </>
    );
};