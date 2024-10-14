'use client'
import { Box, Container, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleTabChange = (_: SyntheticEvent, value: number) => {
        setActiveTab(value);
        router.push(`/${value === 0 ? 'login' : 'signup'}`);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="login/signup tabs">
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
                <Box sx={{ mt: 3 }}>
                    { children }
                </Box>
            </Box>
        </Container>
    );
}
