import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <Box>
            <Box padding={'55px'}>
                <Box><Typography variant='h4' color={'#415b80'} fontWeight={600} marginBlockEnd={'15px'}>Giỏ Hàng</Typography></Box>

                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'center'}>
                    <Box sx={{ width: { xs: '100%', md: '68%' } }}>
                        <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                            <Skeleton animation="wave" width={'100%'} />
                        </Stack>

                        <Stack direction={'row'} justifyContent={'space-between'} gap={2} marginTop={2}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                            <Skeleton animation="wave" width={'100%'} />
                        </Stack>
                    </Box>
                    
                    <Box width={{ xs: '100%', md: '30%' }}>
                        <Box><Skeleton height={'300px'}/></Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}