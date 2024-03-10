'use client'
import { LoginForm } from '@/components/auth';
import Seo from '@/components/common/Seo';
import { useAuth } from '@/hook';
import { LoginPayload } from '@/models';
import { decodeUrl } from '@/utils/url';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInSide() {
    const searchParams = new URLSearchParams(typeof window !== 'undefined'  ? window.location.search : '')
    const router = useRouter()
    const { isLoggedIn, login } = useAuth({})

    const onClick = (provider: 'google' | 'facebook') => {
        const backTo = searchParams?.get('back_to') ? decodeUrl(searchParams?.get('back_to') as string) : '/'
        signIn(provider, { callbackUrl: backTo })
    }

    useEffect(() => {
        if (isLoggedIn === true) {
            router.replace('/')
        }
    }, [isLoggedIn, router])

    async function handleLoginSubmit(payload: LoginPayload) {
        try {
            await login(payload)
            const backTo = searchParams?.get('back_to') ? decodeUrl(searchParams?.get('back_to') as string) : '/'
            router.push(backTo)
        } catch (error: unknown) {
            toast.error('Tài khoản hoặc mật khẩu không chính xác.')
        }
    }

    return (
        <>
            <Seo data={{
                title: 'Nội Thất KZone — Hãy tạo không gian sống thoải mái',
                description: 'Đăng nhập để nhận nhiều ưu đãi chỉ dành riêng cho khách hàng.',
            }} />

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#3982aa' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Nhập
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <LoginForm onSubmit={handleLoginSubmit}></LoginForm>
                            </Suspense>
                            <Grid container marginTop={1}>
                                <Grid item xs>
                                    <Link href="/forgot-password" variant="body2">
                                        Quên mật khẩu
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Bạn chưa có tài khoản? Đăng ký"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box sx={{
                                '& > button': {
                                    mt: 1,
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff !important',
                                    width: '100%',
                                    color: '#000000',
                                    border: '1px solid #222222',
                                }
                            }}>
                                <Button
                                    onClick={() => { onClick('google') }}
                                    type="submit"
                                    variant="contained">
                                    <FcGoogle size={20} />
                                    <Typography fontSize={14} fontWeight={600} sx={{ flexGrow: 1 }}>Tiếp tục với Google</Typography>
                                </Button>
                                <Button
                                    onClick={() => { onClick('facebook') }}
                                    type="submit"
                                    variant="contained">
                                    <AiFillFacebook color='rgb(39,128,243)' size={20} />
                                    <Typography fontSize={14} fontWeight={600} sx={{ flexGrow: 1 }}>Tiếp tục với Facebook</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <ToastContainer />
            </Grid>
        </>
    );
}