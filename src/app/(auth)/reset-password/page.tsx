import { ResetPasswordForm } from '@/components/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';

export default function ResetPassword() {
    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '90vh',
                    backgroundColor: '#ffffff',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#3982aa' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h5" variant="h5">
                    Lấy lại mật khẩu
                </Typography>

                <Box width={{ xs: '100%', sm: '40%' }} padding={2}>
                    <Suspense>
                        <ResetPasswordForm />
                    </Suspense>
                </Box>
            </Box>
        </>
    );
}