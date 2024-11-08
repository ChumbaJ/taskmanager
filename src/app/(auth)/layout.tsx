'use client'
import { Box, Container, IconButton, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../providers/ThemeProvider/ThemeProviderWrapper';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<number>(0);
    const { mode, setMode } = useThemeContext();

    const handleChangeTheme = () => {
        if (mode === 'light') setMode('dark');
        if (mode === 'dark') setMode('light');
    }

    const handleTabChange = (_: SyntheticEvent, value: number) => {
        setActiveTab(value);
        router.replace(`/${value === 0 ? 'login' : 'signup'}`);
    }

    return (
        <>
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 30,
                    top: 20,
                }}
                onClick={handleChangeTheme}>
                {mode === 'light' ? <LightModeIcon/> : <DarkModeIcon/>}
            </IconButton>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label='login/signup tabs'>
                        <Tab label='Login' />
                        <Tab label='Sign Up' />
                    </Tabs>
                    <Box sx={{ mt: 3 }}>
                        { children }
                    </Box>
                </Box>
            </Container>
        </>
    );
}
