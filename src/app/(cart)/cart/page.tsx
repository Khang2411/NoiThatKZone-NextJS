'use client'
import { CartList, CartTotal } from '@/components/cart';
import Seo from '@/components/common/Seo';
import { useAuth } from '@/hook';
import { useCart } from '@/hook/use-cart';
import { useCartDetails } from '@/hook/use-cart-details';
import { ResponseCoupon } from '@/models';
import { debounce } from '@/utils/debounce';
import { Box, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import Error from './error';
import Loading from './loading';

export default function Cart() {
    const [stateCart, setStateCart] = useState(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cart') || '{}'))
    const [coupon, setCoupon] = useState<ResponseCoupon>({ data: null })
    const { isLoggedIn } = useAuth({})
    const { data: dataCart, isLoading: isLoadingCart, mutate, addCoupon } = useCart({ params: { product: stateCart }, enabled: isLoggedIn ? false : true })
    const { data: dataCartUser, mutate: mutateCartUser, updateQuantity, removeCart, isLoading: isLoadingCartUser } = useCartDetails({ enabled: isLoggedIn ? true : false })
    const debouncedHandler = useMemo(() => debounce(mutate, 500), [mutate]);
    const debouncedUserCart = useMemo(() => debounce(mutateCartUser, 500), [mutateCartUser]);

    const handleRemoveCart = async (id: number) => {
        if (isLoggedIn === false) {
            let total = 0;
            let temp: { id: number; quantity: number; }[] = [];

            let cart = dataCart?.data.filter((item: { id: string | number; }) => item.id !== id)
            cart?.map((item: { id: number, quantity: number, price: number; }) => {
                total += item.price * item.quantity;
                temp.push({ id: item.id, quantity: item.quantity })
            })
            localStorage.setItem('cart', JSON.stringify(temp))
            mutate({ data: cart!, total: total }, false)
            setCoupon({ data: null })
        } else {
            await removeCart({ product_id: id })
            debouncedUserCart()
        }

    }

    const handleIncrementCart = async (id: number, stock: number) => {
        if (isLoggedIn === false) {
            stateCart.map((item: { quantity: number; id: number, stock: number }) => {
                if (item.id === id) {
                    item.quantity += item.quantity < stock ? 1 : 0;
                }
            })
            setStateCart([...stateCart]);
            localStorage.setItem('cart', JSON.stringify(stateCart))
            debouncedHandler()
            setCoupon({ data: null })
        } else {
            let quantity;
            dataCartUser?.data.map((item: { quantity: number; id: number, stock: number }) => {
                if (item.id === id) {
                    item.quantity += item.quantity < stock ? 1 : 0;
                    quantity = item.quantity;
                }
            })
            await updateQuantity({ product_id: id, quantity: quantity })
            debouncedUserCart()
        }

    }

    const handleDecrementCart = async (id: number) => {
        if (isLoggedIn === false) {
            let flag = 0;
            stateCart.map((item: { id: number, quantity: number; }) => {
                if (item.id === id) {
                    if (item.quantity === 1) {
                        flag = 1
                    }
                    item.quantity -= item.quantity > 1 ? 1 : 0;
                }
            })
            setStateCart([...stateCart]);
            localStorage.setItem('cart', JSON.stringify(stateCart))
            if (flag === 1) {
                return
            }
            debouncedHandler()
            setCoupon({ data: null })
        } else {
            let quantity;
            dataCartUser?.data.map((item: { quantity: number; id: number, stock: number }) => {
                if (item.id === id) {
                    if (item.quantity >= 2) {
                        item.quantity -= item.quantity > 1 ? 1 : 0;
                    }
                    quantity = item.quantity;
                }
            })
            await updateQuantity({ product_id: id, quantity: quantity })
            debouncedUserCart()
        }
    }

    const handleCouponCart = async (payload: { coupon: string }) => {
        try {
            const couponCart = await addCoupon({ total: dataCartUser?.total ? dataCartUser?.total : dataCart?.total, coupon: payload.coupon })
            setCoupon(couponCart)
        } catch {
            setCoupon({ data: null })
        }
    }

    if (isLoadingCart === true || isLoadingCartUser === true) return <Box className="skeleton"><Loading></Loading></Box>;
    if (isLoggedIn) {
        if (dataCartUser?.data.length === 0 || !dataCartUser?.data) return <Box className="skeleton"><Error /></Box>;
    } else {
        if (dataCart?.data.length === 0 || !dataCart?.data) return <Box className="skeleton"><Error /></Box>;
    }

    return (
        <>
            <Seo data={{
                title: 'Giỏ hàng',
                description: 'Giò hàng nội thất kzone'
            }} />
            <Box>
                <Box component={'section'} sx={{ width: '100%', maxWidth: '1460px', margin: 'auto', paddingBlockStart: '55px' }}>
                    <Box textAlign={'center'}><Typography variant='h4' color={'#415b80'} fontWeight={600} marginBlockEnd={'15px'}>Giỏ Hàng</Typography></Box>
                    {(isLoadingCart === false) && <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <CartList cart={isLoggedIn ? dataCartUser?.data : dataCart?.data} isLoading={isLoadingCart} onRemoveCart={handleRemoveCart} onIncrementCart={handleIncrementCart}
                            onDecrementCart={handleDecrementCart} />
                        <CartTotal total={isLoggedIn ? dataCartUser?.total! : dataCart?.total!} onCouponCart={handleCouponCart} coupon={coupon}></CartTotal>
                    </Stack>}
                </Box>
            </Box></>
    )
}