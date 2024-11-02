'use client'

import { AppBar, Box, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cls from './HeaderMain.module.scss';
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { useSession } from "next-auth/react";
import { useTheme } from "@/app/providers/ThemeProvider/ThemeProviderWrapper";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';

export const HeaderMain = () => {
    const session = useSession();

    const { mode, setMode } = useTheme();

    const handleChangeTheme = () => {
        if (mode === 'light') setMode('dark');
        if (mode === 'dark') setMode('light');
    }

    return (
        <AppBar className={cls.appbar}>
            <Toolbar className={cls.toolbar}>
                <OutlinedInput
                    className={cls.search}
                    placeholder='Search'
                    startAdornment={
                    <InputAdornment position='start'>
                        <SearchIcon className={cls.searchIcon}/>
                    </InputAdornment>}
                />
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