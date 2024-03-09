'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function Error() {
    return (
        <Box>
            <Box padding={'55px'}>
                <Box><Typography variant='h4' color={'#415b80'} fontWeight={600} marginBlockEnd={'15px'}>Giỏ Hàng</Typography></Box>

                <Box marginTop={'20px'} textAlign={'center'}>
                    <RemoveShoppingCartIcon color="primary" sx={{ fontSize: 160 }} />
                    <Typography variant='h6' fontWeight={600} margin={'12px 0px 2px'}>Giỏ hàng trống</Typography>
                </Box>

            </Box>
        </Box>
    )
}