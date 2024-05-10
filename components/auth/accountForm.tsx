'use client'
import { InputField } from '@/components/form';
import { useAuth } from '@/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface AccountFormProps {
    onSubmit?: (payload: any) => void
}

export function AccountForm({ onSubmit }: AccountFormProps) {
    const { isLoggedIn, profile } = useAuth()

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Vui lòng nhập Họ và tên')
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = useForm<any>({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (profile) {
            setValue('name', profile?.data?.name)
        }
    }, [profile, setValue]);

    async function handleLoginSubmit(payload: any) {
        await onSubmit?.(payload)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField name="name" label="Họ và tên" control={control} sx={{ marginBlockEnd: '15px' }} />
            <Box>
                <Typography component={'span'}>Email: </Typography>
                <Typography component={'span'} marginRight={'10px'}>{profile?.data?.email}</Typography>
                <Link href="/customer/email">Thay đổi</Link>
            </Box>
        
            <Box>
                <Typography component={'span'}>Địa chỉ: </Typography>
                <Typography component={'span'} marginRight={'10px'}>{profile?.data.address !== null ? profile?.data.address.apartment_number : ''}</Typography>
                <Link href="/customer/address">Thay đổi</Link>
            </Box>
            <Box>
                <Typography component={'span'}>Mật khẩu: </Typography>
                <Typography component={'span'} marginRight={'10px'}>**********</Typography>
                <Link href="/customer/password">Thay đổi</Link>
            </Box>

            <Button
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, background: '#1976d2 !important' }}
            >
                Lưu
            </Button>
        </Box>
    )
}