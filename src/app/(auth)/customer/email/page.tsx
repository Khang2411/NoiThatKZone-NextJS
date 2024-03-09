'use client'
import { AccountEmailForm } from '@/components/auth';
import { useAccount } from '@/hook';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountEmail() {
    const { updateEmail } = useAccount()

    const handleSubmitEmail = async (payload: { email: string }) => {
        try {
            await updateEmail(payload)
            toast.success('Cập nhật email thành công', { autoClose: 1000 })
        } catch (err) {
            return
        }
    }
    return (
        <>
            <ToastContainer />

            <Box sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}>
                <Box padding={'15px'}>
                    <Typography variant='h6'>Thay đổi email</Typography>
                </Box>
                <Stack direction='row' padding={'15px'} gap={3}>
                    <Box>
                        <Avatar alt="Remy Sharp" sx={{ width: 86, height: 86 }} />
                    </Box>

                    <Box flex={1}>
                        <AccountEmailForm onSubmit={handleSubmitEmail}></AccountEmailForm>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}