'use client'
import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/FormElements/Input/Input';

interface ISignUp {
    username: string
    email: string
    password: string
    passwordConfirm: string
}

const defaultValues: ISignUp = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
}

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const methods = useForm({ defaultValues });

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const onSubmit = async (formData: ISignUp) => {
        if (formData.password !== formData.passwordConfirm) {
            console.log('The passwords are not the same');
            return;
        };

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })

        const responseBody = await response.json();
        
        if (responseBody.status !== 'success') {
            console.log('Something went wrong!');
            return;
        }

        signIn('credentials', {
            email: formData.email,
            password: formData.password,
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
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoFocus
                            registerOptions={{ required: true }}
                        />
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Электронная почта"
                            name="email"
                            registerOptions={{ required: true }}
                        />
                        <Input
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
                            registerOptions={{ required: true }}
                        />
                        <Input
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
                            registerOptions={{ required: true }}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </FormProvider>
            </Box>
        </Container>
    );
}
