'use client';

import { Box, List, ListItem, useTheme } from '@mui/material';
import Link from 'next/link';
import cls from './CDrawer.module.scss';
import LogoWhite from '../../../assets/svg/logoWhite.svg';
import LogoBlack from '../../../assets/svg/logoBlack.svg';
import Image from 'next/image';
import { useThemeContext } from '@/app/providers/ThemeProvider/ThemeProviderWrapper';

export const CDrawer = () => {
    const theme = useTheme();
    const currentTheme = useThemeContext();

    return (
        <Box className={cls.Drawer} sx={{ background: theme.palette.background.block }}>
            {currentTheme.mode === 'dark' ? 
                <Image src={LogoWhite} alt="logo" /> 
                : <Image src={LogoBlack} alt='logo' />}
            <List>
                <ListItem>
                    <Link href={'/'}>Task manager</Link>
                </ListItem>
            </List>
        </Box>
    );
};
