'use client'
import { InputField } from '@/components/form';
import { useAuth } from '@/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

type ForgotPasswordPayload = {
    email: string
}
export default function ForgotPassword() {
    const { forgotPassword } = useAuth({})

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Không được trống')
            .email(),
    })
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ForgotPasswordPayload>({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    })

    async function handleEmailSubmit(payload: ForgotPasswordPayload) {
        try {
            await forgotPassword(payload)
            toast.success('Vui lòng kiểm tra email', {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Zoom,
            });
        } catch {
            toast.error('Không có tài khoản trong hệ thống', {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Zoom,
            });
        }
    }
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
                <ToastContainer />

                <Avatar sx={{ m: 1, bgcolor: '#3982aa' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h5" variant="h5">
                    Lấy lại mật khẩu
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleEmailSubmit)} sx={{ mt: 3 }} padding={2}>
                    <InputField name="email" label="Email" control={control} sx={{ marginBlockEnd: '15px' }} />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                        sx={{
                            mt: 3, mb: 2, backgroundColor: 'rgb(229 231 235) !important',
                            color: '#000000', fontWeight: '600', float: 'right', letterSpacing: '0.1em', fontSize: '0.75rem'
                        }}>
                        Xác thực qua Email
                    </Button>
                </Box>
            </Box> </>
    );
}