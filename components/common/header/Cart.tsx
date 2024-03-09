'use client'
import { useAuth } from '@/hook';
import { useCartDetails } from '@/hook/use-cart-details';
import { useCartStore } from '@/store/CountCartStore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Cart() {
    const [stateCart] = useState(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cart') || '{}'))
    const { isLoggedIn } = useAuth({})
    const { data: dataCartUser } = useCartDetails({ enabled: isLoggedIn ? true : false })
    const countCart = useCartStore((stateCart: { count: number; }) => stateCart.count)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <Link href={'/cart'}>
            <Box position={'relative'}>
                <ShoppingCartIcon color="action" />
                <Badge badgeContent={isLoggedIn ? dataCartUser?.data.length : isClient && ( stateCart?.length ? stateCart.length : 0) + countCart} color="primary" sx={{ position: 'absolute', top: 0, right: 0 }} />
            </Box>
        </Link>
    )
}