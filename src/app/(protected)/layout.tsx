import { CDrawer } from '@/shared/ui/CDrawer'
import { HeaderMain } from '@/widgets/Header'
import { Box } from '@mui/material'
import React, { PropsWithChildren } from 'react'

function MainLayout({ children }: PropsWithChildren) {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CDrawer/>
            <Box sx={{ flexGrow: 1 }}>
                <HeaderMain/>
                <Box
                    component='main' 
                    sx={{ 
                        mt: '100px', 
                        p: '35px 60px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px'
                    }}
                >
                    { children }
                </Box>
            </Box>
        </Box>
    )
}

export default MainLayout