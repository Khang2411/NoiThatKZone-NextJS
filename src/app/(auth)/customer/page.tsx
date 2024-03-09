'use client'
import { AccountForm } from '@/components/auth';
import { useAuth } from '@/hook';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Loading from './loading';

export default function Account() {
    const { profile, isLoading, error } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // if (error) return router.push(`/login?back_to=${encodeUrl(pathname)}`)
    if (isLoading) return <Box><Loading></Loading></Box>;

    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}>
                <Box padding={'15px'}>
                    <Typography variant='h5'>Thông tin cá nhân</Typography>
                </Box>
                <Stack direction='row' padding={'15px'} gap={3}>
                    <Box>
                        <Avatar alt="Remy Sharp" src={profile?.data?.profile_photo_url} sx={{ width: 86, height: 86 }} />
                    </Box>

                    <Box flex={1}>
                        <AccountForm></AccountForm>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}