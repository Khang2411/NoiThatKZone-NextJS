'use client'
import { AccountPasswordForm } from '@/components/auth';
import { useAccount } from '@/hook';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountPassword() {
    const { updatePassword } = useAccount()

    const handleSubmitPassword = async (payload: { password: string }) => {
        try {
            await updatePassword(payload)
            toast.success('Cập nhật mật khẩu thành công', { autoClose: 1000 })
        } catch (err) {
            return
        }
    }
    return (
        <>
            <ToastContainer />

            <Box sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}>
                <Box padding={'15px'}>
                    <Typography variant='h6'>Thay đổi mật khẩu</Typography>
                </Box>
                <Stack direction='row' padding={'15px'} gap={3}>
                    <Box>
                        <Avatar alt="Remy Sharp" sx={{ width: 86, height: 86 }} />
                    </Box>

                    <Box flex={1}>
                        <AccountPasswordForm onSubmit={handleSubmitPassword}></AccountPasswordForm>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}