'use client'
import { Box, Grid, Stack, Typography } from '@mui/material'

type CheckoutTotalProps = {
    total: number,
    coupon: any
}

export function CheckoutTotal({ total, coupon }: CheckoutTotalProps) {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Typography component={'span'}>Tạm tính: </Typography>
                </Grid>
                <Grid item xs={3} textAlign={'right'}>
                    <Typography component={'span'} fontWeight={600} fontSize={14}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                    </Typography>
                </Grid>
            </Grid>

            {coupon.data !== null &&
                <Stack direction={'column'}>
                    <Typography component={'span'} color={'#6e7191'}>Mã coupon: {coupon.data.code} </Typography>
                    <Typography component={'span'} color={'#6e7191'}>
                        Tổng giảm giá: {coupon?.discount ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(coupon.discount) : ""}
                    </Typography>
                </Stack>
            }
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Typography component={'span'} fontWeight={600}>Tổng cộng: </Typography>
                </Grid>
                <Grid item xs={3} textAlign={'right'}>
                    <Typography component={'span'} fontWeight={600} fontSize={17}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total - (coupon?.discount ? coupon.discount : 0))}
                    </Typography>
                </Grid>
            </Grid>
        </Box >

    )
}

