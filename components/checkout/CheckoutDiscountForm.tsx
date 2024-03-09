'use client'
import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import { InputField } from '../form'
import { useForm } from 'react-hook-form';

type Props = {
    onCouponCart?: (payload: FormValues) => void,
    coupon: string | null
}
type FormValues = {
    coupon: string

};
export function CheckoutDiscountForm({ onCouponCart, coupon }: Props) {
    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            coupon: coupon ? coupon : '',
        },
        mode: "onChange"
    });

    const onSubmit = (payload: FormValues) => {
        onCouponCart?.(payload)
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'row'} gap={2}>
                <Box flex={1}>
                    <InputField control={control}
                        name='coupon'
                        size='small'
                        placeholder='Nhập coupon khuyến mãi' />
                </Box>
                <Box>
                    <Button type='submit' variant="contained" sx={{ backgroundColor: '#F8F0E3  !important', color: '#7B7771', borderRadius: '10px' }}>
                        Áp dụng
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}