'use client'

import { AppBar, Box, Button, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography, useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cls from './HeaderMain.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { useThemeContext } from '@/app/providers/ThemeProvider/ThemeProviderWrapper';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';

export const HeaderMain = () => {
    const session = useSession();

    const { mode, setMode } = useThemeContext();
    const theme = useTheme();

    const handleChangeTheme = () => {
        if (mode === 'light') setMode('dark');
        if (mode === 'dark') setMode('light');
    }

    return (
        <AppBar 
            sx={{
                background: theme.palette.background.default,
                boxShadow: theme.shadows[1],
            }} 
            className={cls.appbar}
        >
            <Toolbar className={cls.toolbar}>
                <OutlinedInput
                    className={cls.search}
                    placeholder='Search'
                    startAdornment={
                    <InputAdornment position='start'>
                        <SearchIcon className={cls.searchIcon}/>
                        </InputAdornment>}
                />
                <Button
                    variant='outlined'
                    onClick={() => signOut()}
                >
                    Logout
                </Button>
                <Box className={cls.account__container}>
                    <IconButton className={cls.accountIconButton}>
                        <AccountCircleIcon className={cls.accountIconSvg}/>
                    </IconButton>
                    <Typography>{session.data?.user?.name}</Typography>
                    <IconButton className={cls.themeButton} onClick={handleChangeTheme}>
                        {mode === 'light' ? <LightModeIcon/> : <DarkModeIcon/>}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}