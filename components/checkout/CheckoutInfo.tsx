'use client'
import { Cart } from '@/models'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type CheckoutInfoProps = {
    cart: Cart[] | undefined
}

export function CheckoutInfo({ cart }: CheckoutInfoProps) {

    return (
        <Box>
            {cart?.map((item: { thumbnail: string, name: string, price: number, quantity: number }, index: React.Key) =>
                <Stack direction={'row'} gap={1} alignItems={'center'} key={index} marginBlockStart={'15px'}>
                    <Box position={'relative'}>
                        <Image src={item.thumbnail} width={84} height={84} alt='checkout-img' />
                        <Box position={'absolute'} top={'-10px'} right={'-5px'} bgcolor={'#6F6D6B'} width={23}
                            borderRadius={'50%'} textAlign={'center'} color='#fff' fontSize={'12px'}>
                            {item.quantity}
                        </Box>
                    </Box>

                    <Typography fontSize={'14px'}>{item.name}</Typography>
                    <Typography>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.quantity * item.price)}
                    </Typography>
                </Stack>
            )}
        </Box>
    )
}