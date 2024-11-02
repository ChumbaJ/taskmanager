'use client'

import { signOut } from 'next-auth/react';
import cls from './MainPage.module.scss';

export const MainPage = () => {
    return (
        <div className={cls.contianer}>
            <p>Hello world</p>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    );
};