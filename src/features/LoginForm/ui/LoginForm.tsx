'use client'

import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: '/',
        });
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box 
                    component="form" 
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        id="password"
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: 
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <VisibilityOffIcon/>: <VisibilityIcon/>}
                                        </IconButton>        
                                    </InputAdornment>
                            }
                        }}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Войти
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
