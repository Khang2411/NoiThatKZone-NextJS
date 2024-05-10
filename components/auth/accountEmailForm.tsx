'use client'
import { Button, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginPayload } from '@/models'

interface AccountEmailProps {
    onSubmit?: (payload: LoginPayload) => void
}

export function AccountEmailForm({ onSubmit }: AccountEmailProps) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập Email')
            .email(),
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<any>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(schema),
    })

    async function handleLoginSubmit(payload: LoginPayload) {
        //console.log(payload)
        await onSubmit?.(payload)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField name="email" label="Email" control={control} sx={{ marginBlockEnd: '15px' }} />

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