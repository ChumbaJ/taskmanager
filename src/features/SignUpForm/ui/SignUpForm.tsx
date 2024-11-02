'use client'
import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface ISignUp {
    username: string
    email: string
    password: string
    passwordConfirm: string
}

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get('password') !== formData.get('passwordConfirm')) {
            console.log('The passwords are not the same');
            return;
        };

        const body: ISignUp = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            passwordConfirm: formData.get('passwordConfirm') as string,
        }!;

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        const responseBody = await response.json();
        
        if (responseBody.status !== 'success') {
            console.log('Something went wrong!');
            return;
        }

        signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: '/',
        });
    };

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
                    Регистрация
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Имя пользователя"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Электронная почта"
                        name="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: 
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                        </IconButton>        
                                    </InputAdornment>
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Подтвердите пароль"
                        id="confirmPassword"
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
                        Зарегистрироваться
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
