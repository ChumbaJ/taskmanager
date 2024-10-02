'use client'
import { Box, Container, Tab, Tabs } from "@mui/material";
import { SyntheticEvent } from "react";
import { useRouter } from 'next/navigation';
import Login from "./login/page";
import SignUp from "./signup/page";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const handleTabChange = (_: SyntheticEvent, value: number) => router.push(`/${value === 0 ? 'login' : 'signup'}`);

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
                <Tabs onChange={handleTabChange} aria-label="login/signup tabs">
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
