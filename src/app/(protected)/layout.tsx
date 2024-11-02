import { HeaderMain } from '@/widgets/Header'
import { Box } from '@mui/material'
import React, { PropsWithChildren } from 'react'

function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <HeaderMain/>
            <Box
                component='main' 
                sx={{ mt: '100px', p: '35px 60px' }}
            >
                { children }
            </Box>
        </>
    )
}

export default MainLayout