/* eslint-disable @next/next/no-img-element */
"use client"
import { useAuth } from '@/hook';
import { useCart } from '@/hook/use-cart';
import { useCartDetails } from '@/hook/use-cart-details';
import { ApiError, Product, UserProfile } from '@/models';
import { useCartStore } from '@/store/CountCartStore';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductFeaturePolicy } from '.';
import { ProductFeatureAttent } from './ProductFeatureAttent';

type FeatureInfoProps = {
  product: Product
  user: UserProfile | undefined
}

export function ProductFeatureInfo({ product, user }: FeatureInfoProps) {
  const [state, setState] = useState(1)
  const { isLoggedIn } = useAuth({})
  const { checkStock, addToCart } = useCart({ enabled: false })
  const { mutate: mutateCartUser } = useCartDetails({ enabled: isLoggedIn ? true : false })
  const router = useRouter()
  const increaseCart = useCartStore((state) => state.increasePopulation)

  const handleIncrement = () => {
    if (state < product.stock) {
      setState(state + 1);
    } else {
      setState(state + 0)
    }
  }

  const handleDecrement = () => {
    if (state <= 1) {
      setState(state - 0)
    } else {
      setState(state - 1)
    }
  }

  const handleCart = async (id: number) => {
    if (!isLoggedIn) {
      let cart = JSON.parse(localStorage.getItem('cart') as string) || []
      let res = cart.find((item: { id: number }) => item.id === product.id)
      if (cart.length === 0) {
        cart.push({ id: id, quantity: state });
        increaseCart()
      }
      else {
        if (res === undefined) {
          cart.push({ id: id, quantity: state });
          increaseCart()
        } else {
          for (let cartItem of cart) {
            if (cartItem.id === product.id) {
              cartItem.quantity += state
            }
          }
        }
      }
      try {
        await checkStock({ product_id: id, quantity: res?.quantity ? res.quantity : state })
      } catch (err) {
        const result = err as AxiosError<ApiError>;
        toast(result.response?.data?.error, { position: "top-center", autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "dark", });
        return;
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      await addToCart({ product_id: id, quantity: state });
    }
    mutateCartUser()
    toast.info('Thêm thành công', {
      position: "bottom-right", autoClose: 1000, closeOnClick: true, draggable: true, hideProgressBar: false, theme: "light", transition: Zoom
    });
  }

  const handleBuyNow = async (id: number) => {
    await handleCart(id)
    router.push('/cart')
  }

  return (
    <Box>
      <ToastContainer />
      <Box sx={{
        padding: '15px',
        '& div': {
          margin: '25px 0'
        }
      }}>
        <Typography fontSize={{ xs: '24px', md: '27px' }} lineHeight={1.25} fontWeight={600} color={'#415b80'}>{product?.name}</Typography>
        <Box>
          <Box>
            {product?.price_before_discount ?
              <Typography component={'span'} sx={{ textDecoration: 'line-through', marginRight: '10px' }} color={'#74859b'}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price_before_discount)}
              </Typography> : ""}
            <Typography component={'span'} fontSize={'22px'} fontWeight={600} color={'#ff8080'} marginRight={'10px'}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}
            </Typography>
            <Typography component={'span'} fontSize={'12px'}
              padding={'4px 6px'}
              borderRadius={'4px'} color={'#ffff'}
              sx={{ background: '#ff8080', verticalAlign: 'super' }}>10% OFF</Typography>
          </Box>

          <Box>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
              <Typography>Số lượng : </Typography>
              <IconButton aria-label="delete" size="small" onClick={() => handleDecrement()}
                sx={{ border: '1px solid #B0B0B0' }}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ borderRadius: '50%', backgroundColor: '#FF8080', padding: '6px 15px', color: '#ffff' }}> {state} </Typography>
              <IconButton aria-label="delete" size="small" onClick={() => handleIncrement()}
                sx={{ border: '1px solid #B0B0B0' }}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Box>

          <Stack direction={'row'} spacing={1} justifyContent={'space-between'} sx={{
            '& button': {
              width: '100%',
            }
          }}>
            <Button variant="contained" sx={{ backgroundColor: '#ff8080 !important', borderRadius: '25px' }} size='large' onClick={() => handleCart(product.id)}>Thêm Vào Giỏ</Button>
            <Button variant="contained" sx={{ backgroundColor: '#415b80  !important', borderRadius: '25px' }} size='large' onClick={() => handleBuyNow(product.id)}>Mua Ngay</Button>
          </Stack>
        </Box>

        <Box>
          <Typography component={'span'} color={'#6e7191'} fontSize={'16px'} fontWeight={'600'}>Thể loại: </Typography>
          <Typography component={'span'}>Bàn làm việc</Typography>
        </Box>
        <Box border={'2px solid grey'} padding={'10px'} borderRadius={'25px'} position={'relative'} textAlign={'center'}>
          <Typography position={'absolute'} fontSize={'18px'}
            top={'-15px'} left={0} right={0}
            margin={'auto'}
            width={'fit-content'}
            padding={'0 15px'} color={'#6e7191'}
            sx={{ background: '#FFFFFF' }}>
            Phương thức thanh toán
          </Typography>
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
            <Image alt='logo' width={50} height={50} src="/img/cod.png" />
            <Image alt='logo' width={30} height={30} src="/img/momosquare.png" />
            <CreditCardIcon color="primary" sx={{ fontSize: '40px' }}></CreditCardIcon>
          </Stack>
        </Box>

        <Box><ProductFeatureAttent></ProductFeatureAttent></Box>
        <Box><ProductFeaturePolicy></ProductFeaturePolicy></Box>
      </Box>
    </Box>
  );
}
