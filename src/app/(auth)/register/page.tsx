'use client'
import { RegisterForm } from '@/components/auth';
import Seo from '@/components/common/Seo';
import { useAuth } from '@/hook';
import { useRegionList } from '@/hook/use-region';
import { RegisterPayload } from '@/models';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const { data: cities } = useRegionList();
    const { register } = useAuth()
    const router = useRouter()

    async function handleRegisterSubmit(payload: RegisterPayload) {
        try {
            await register(payload)
            router.push('/login')
        } catch (err) {
            console.log(err);
            toast.error('Tài khoản đã tồn tại', {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Zoom,
            });
            return
        }
    }
    return (
        <>
            <Seo data={{
                title: 'Nội Thất KZone — Hãy tạo không gian sống thoải mái',
                description: 'Đăng ký ngay để nhận nhiều ưu đãi chỉ dành riêng cho khách hàng.',
            }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#ffffff',
                    marginBottom: '10px'
                }}>
                <ToastContainer />
                <Avatar sx={{ m: 2, bgcolor: '#3982aa' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <Box sx={{ mt: 3 }} padding={2}>
                    <RegisterForm onSubmit={handleRegisterSubmit} cities={cities?.data}></RegisterForm>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Bạn đã có tài khoản? Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
