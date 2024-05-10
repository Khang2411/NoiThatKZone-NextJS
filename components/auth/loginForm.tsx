'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginPayload } from '@/models'

interface LoginFormProps {
    onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập Email')
            .email(),

        password: yup
            .string()
            .required('Vui lòng nhập Password')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
    })

    const [showPassword, setShowPassword] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginPayload>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    async function handleLoginSubmit(payload: LoginPayload) {
        await onSubmit?.(payload)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField name="email" label="Email" control={control} sx={{ marginBlockEnd: '15px' }} />

            <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
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

            <Button
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, background: '#1976d2 !important' }}
            >
                Đăng Nhập
            </Button>
        </Box>
    )
}