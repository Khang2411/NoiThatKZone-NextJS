'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useState } from 'react'
import { InputField } from '@/components/form'
import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface AccountPasswordProps {
    onSubmit?: (payload: any) => void
}

export function AccountPasswordForm({ onSubmit }: AccountPasswordProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const schema = yup.object().shape({
        password: yup
            .string()
            .required('Vui lòng nhập Password')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
        password_confirmation: yup
            .string()
            .required('Vui lòng nhập Password')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<any>({
        defaultValues: {
            password: '',
            password_confirmation:''
        },
        resolver: yupResolver(schema),
    })

    async function handleLoginSubmit(payload: any) {
        console.log(payload)
        await onSubmit?.(payload)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Box>
                <InputField
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Mật khẩu mới"
                    control={control}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((x) => !x)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box marginBlockStart={'15px'}>
                <InputField
                    type={showPasswordConfirm ? 'text' : 'password'}
                    name="password_confirmation"
                    label="Nhập lại mật khẩu mới"
                    control={control}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswordConfirm((x) => !x)}
                                    edge="end"
                                >
                                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
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