import type { Metadata } from 'next';
import { CssBaseline } from '@mui/material';
import localFont from 'next/font/local';

export const metadata: Metadata = {
    title: 'Task manager',
    description: 'Generated by create next app',
};

const myFont = localFont({
    src: [
        {
            path: './global/fonts/Roboto-Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: './global/fonts/Roboto-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './global/fonts/Roboto-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './global/fonts/Roboto-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
            <CssBaseline />
            <body className={myFont.className}>{children}</body>
        </html>
    );
}