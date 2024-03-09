import { Box, Stack, LinearProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <Box>
            <Stack height={'50vh'} alignItems={'center'} justifyContent={'center'}>
                <Box width={'30%'}>
                    <LinearProgress variant="indeterminate" />
                </Box>
            </Stack>
        </Box>
    )
}