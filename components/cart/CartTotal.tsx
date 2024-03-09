import { useAuth } from '@/hook'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'

type CartTotalProps = {
    onCouponCart?: (payload: FormValues) => void,
    total: number,
    coupon: any
}

type FormValues = {
    coupon: string;
};

export function CartTotal({ onCouponCart, total, coupon }: CartTotalProps) {
    const { isLoggedIn, profile } = useAuth({})
    const router = useRouter()

    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            coupon: ""
        },
        mode: "onChange"
    });

    const handleCouponSubmit = (payload: FormValues) => {
        onCouponCart?.(payload)
    };

    const handleCheckout = () => {
        if (isLoggedIn === true && !profile?.data?.address) {
            router.push('/customer/address')
        } else {
            router.push(`/checkouts/?coupon=${coupon.data !== null ? coupon.data.code : ''}`)
        }
    }

    return (
        <Box>
            <Box paddingBlockStart={'15px'} position={'sticky'} top={'15px'}>
                <Box padding={'16px'} marginBlockEnd={'15px'} boxShadow={'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;'} bgcolor={'#FFFFFF'} borderRadius={'5px'}>
                    <Box marginBlockEnd={'15px'}>
                        <Typography>Khuyến mãi</Typography>
                    </Box>
                    <form onSubmit={handleSubmit(handleCouponSubmit)}>
                        <Stack direction={'row'} gap={2}>
                            <Box flex={1}>
                                <InputField control={control}
                                    name='coupon'
                                    size='small'
                                    placeholder='Nhập coupon khuyến mãi' />
                            </Box>
                            <Box>
                                <Button type='submit' variant="contained" sx={{ backgroundColor: '#ff8080  !important', borderRadius: '25px' }}>
                                    Áp dụng
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>

                <Box>
                    <Box boxShadow={'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px'} marginBlockEnd={'15px'} padding={'16px'} bgcolor={'#FFFFFF'} borderRadius={'5px'}>
                        {!coupon.error &&
                            <Stack direction={'column'}>
                                <Typography component={'span'} color={'#6e7191'}>
                                    Tổng tiền hàng: {total ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total) : ""}
                                </Typography>
                                {coupon.data?.code &&
                                    <Box>
                                        <Typography color={'#6e7191'}>Mã coupon: {coupon.data.code} </Typography>
                                        <Typography color={'#6e7191'}>
                                            Tổng giảm giá: {coupon.discount ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(coupon.discount) : ""}
                                        </Typography>
                                    </Box>}
                            </Stack>
                        }
                        <Typography component={'span'} color={'#6e7191'} fontSize={18} fontWeight={600}>Tổng tiền: </Typography>
                        <Typography component={'span'} color={'#FF5A64'} fontSize={18} fontWeight={600}>
                            {coupon.total ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(coupon.total) : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" sx={{ backgroundColor: '#ff8080  !important', borderRadius: '25px', width: '100%' }} onClick={() => handleCheckout()}>
                            Thanh toán
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}