'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { usePathname } from 'next/navigation'

export function Slogan() {
    const pathname = usePathname()

    return (
        <>
            {   
                pathname === '/checkouts' ||
                pathname === '/cart' ||
                pathname === '/login' ||
                pathname === '/register' ||
                pathname === '/customer/:path*' ? ""
                : <Box component={'section'}>
                    <Box padding={'50px'} sx={{ backgroundColor: '#0097b2', color: '#fff' }}>
                        <Typography textAlign={'center'} variant='h5'>KHÔNG CẦN ĐẾN SHOWROOM - CHÚNG TÔI MANG ĐẾN TẬN CỬA NHÀ BẠN</Typography>
                        <Typography textAlign={'center'}>Chúng tôi đã làm hài lòng hơn 10,000+ Khách hàng trong và ngoài nước, từ nội thất gia đình đến nội thất văn phòng.</Typography>
                    </Box>
                </Box>
            }
        </>
    )
}