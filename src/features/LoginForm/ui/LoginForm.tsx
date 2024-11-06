'use client'

import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Input } from '@/shared/ui/FormElements/Input/Input';
import { FormProvider, useForm } from 'react-hook-form';


interface LoginForm {
    email: string
    password: string
}

const defaultValues: LoginForm = {
    email: '',
    password: '',
}

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const methods = useForm<LoginForm>({ defaultValues });

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const onSubmit = async (formData: LoginForm) => {
        signIn('credentials', {
            email: formData.email,
            password: formData.password,
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
                <FormProvider {...methods}>
                    <form 
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            registerOptions={{ required: true }}
                        />
                        <Input
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
                            registerOptions={{ required: true }}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Войти
                        </Button>
                    </form>
                </FormProvider>
                <Button variant='outlined'
                    onClick={async () => {
                        const res = await fetch('/api/task')
                        console.log(await res.json())
                    }}
                >Unauthorized request</Button>
            </Box>
        </Container>
    );
}
