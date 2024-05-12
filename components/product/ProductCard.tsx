'use client'
import { useAuth, useCart } from '@/hook'
import { useCartDetails } from '@/hook/use-cart-details'
import { ApiError, Product } from '@/models'
import { useCartStore } from '@/store/CountCartStore'
import { truncate } from '@/utils/truncate'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Button, Rating, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ToastContainer, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
    product: Product
}

export function ProductCard({ product }: Props) {
    const pathname = usePathname()
    const { isLoggedIn } = useAuth({})
    const { checkStock, addToCart } = useCart({ enabled: false })
    const { mutate: mutateCartUser } = useCartDetails({ enabled: isLoggedIn ? true : false })
    const increaseCart = useCartStore((state) => state.increasePopulation)
    
    const handleCart = async () => {
        if (!isLoggedIn) {
            let cart = JSON.parse(localStorage.getItem('cart') as string) || []
            let res = cart.find((item: { id: number }) => item.id === product.id)
            if (cart.length === 0) {
                cart.push({ id: product.id, quantity: 1 });
                increaseCart()
            }
            else {
                if (res === undefined) {
                    cart.push({ id: product.id, quantity: 1 });
                    increaseCart()
                } else {
                    for (let cartItem of cart) {
                        if (cartItem.id === product.id) {
                            cartItem.quantity += 1
                        }
                    }
                }
            }
            try {
                await checkStock({ product_id: product.id, quantity: res?.quantity ? res.quantity : 1 })
            } catch (err) {
                const result = err as AxiosError<ApiError>;
                toast(result.response?.data?.error, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            localStorage.setItem('cart', JSON.stringify(cart))
        } else {
            await addToCart({ product_id: product.id, quantity: 1 });
        }
        mutateCartUser()
        toast.info('Thêm thành công', {
            position: "bottom-right", autoClose: 1000, closeOnClick: true, draggable: true, hideProgressBar: false, theme: "light", transition: Zoom
        });
    }
    
    return (
        <Box height={'100%'}>
            <ToastContainer />
            <Box
                position={'relative'}
                bgcolor={'#ffff'}
                boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}
                borderRadius={'18px'}
                marginBlockEnd={'10px'}
                height={'100%'}
                sx={{
                    ':hover': {
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                    },
                    ':hover > .btn-cart': {
                        opacity: '1',
                        visibility: 'visible',
                        bottom: '5px'
                    }
                }}
            >
                <Link href={`/${product.slug}/${product.id}`}>
                    <Box
                        sx={pathname === '/' ? {
                            position: 'relative',
                            //  backgroundImage: `url("https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/campaign/Frame-knockout-desktop-226x500.png")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: '100% 100%',
                            padding: '30px',
                            '&::before': {
                                position: 'absolute',
                                content: '""',
                                backgroundImage: `url("/img/product-hot.png")`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                width: '55px',
                                height: '55px',
                                bottom: '3px',
                                right: '12px',
                            }
                        } : { padding: '10px' }}
                    >
                        {product.thumbnail &&
                            <Image
                                src={product.thumbnail}
                                alt="Picture of the product"
                                width={235}
                                height={235}
                                quality={100}
                                style={{ margin: 'auto', marginBlockEnd: '10px', }}
                            />}
                    </Box>
                    <Box padding={'7px 10px'}>
                        <Typography fontSize={'14px'} color={'#415b80'} fontWeight={600} marginBottom={'10px'}>{truncate(product.name, 46)}</Typography>
                        <Box>
                            <Rating name="read-only" value={5} readOnly size='small' />
                        </Box>
                        <Stack direction='row' flexWrap='wrap' >
                            {product.price_before_discount &&
                                <Typography fontSize={'16px'} sx={{ textDecoration: 'line-through' }} color={'#74859b'} marginRight={'10px'}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price_before_discount)}
                                </Typography>}
                            <Typography fontSize={'16px'} fontWeight={600} color={'#ff8080'}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                            </Typography>
                        </Stack>
                    </Box>
                </Link>

                <Button className="btn-cart" variant="contained" startIcon={<ShoppingCartIcon />} fullWidth
                    sx={{
                        display: { xs: 'none', md: 'inline-block' },
                        fontSize: '11px',
                        borderRadius: '12px',
                        background: '#FF8080 !important',
                        visibility: 'hidden',
                        opacity: '0',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translate(-50%)',
                        width: 'calc(100% - 50px)',
                        transition: 'all 0.75s ease',
                        padding: '6px 12px'
                    }}
                    onClick={() => handleCart()}>
                    Thêm Vào Giỏ
                </Button>
            </Box >
        </Box>

    )
}