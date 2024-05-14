'use client'
import { CheckoutDiscountForm, CheckoutForm, CheckoutInfo, CheckoutTotal } from '@/components/checkout'
import { useAuth, useCart } from '@/hook'
import { useCartDetails } from '@/hook/use-cart-details'
import { useCheckout } from '@/hook/use-checkout'
import { useCoupon } from '@/hook/use-coupon'
import { useRegionList } from '@/hook/use-region'
import { ResponseCoupon } from '@/models'
import { useCartStore } from '@/store/CountCartStore'
import { encodeUrl } from '@/utils/url'
import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from './loading'
import NotFound from '../../not-found'

export default function Checkouts() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { isLoggedIn, profile, isLoading: isLoadingLoggedIn } = useAuth()
  const [stateCart, setStateCart] = useState(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cart') || '{}'))
  const [coupon, setCoupon] = useState<ResponseCoupon>({ data: null })
  const { data: cities } = useRegionList();
  const { data: dataCart, addCoupon, isLoading: isLoadingCart, error: cartError } = useCart({ params: { product: stateCart }, enabled: (isLoadingLoggedIn === false && isLoggedIn === false) ? true : false })
  const { data: dataCartUser, isLoading, error: cartUserError } = useCartDetails({ enabled: (isLoadingLoggedIn === false && isLoggedIn) ? true : false })
  const { data: couponData } = useCoupon({ params: { total: isLoggedIn ? dataCartUser?.total : dataCart?.total, coupon: useSearchParams().get('coupon') }, enabled: isLoading || isLoadingCart })
  const { checkout, checkoutMomo, checkoutVnpay } = useCheckout()
  const removeAllCart = useCartStore((state) => state.removeAllCart)

  useEffect(() => {
    if (couponData) {
      setCoupon(couponData)
    }

    if (isLoggedIn === true && profile?.data?.address === null) {
      router.push('/customer/address');
    }
  }, [couponData, isLoggedIn, profile?.data?.address, router])

  async function handleCheckout(payload: any) {
    const params = {
      order: {
        'email': isLoggedIn ? profile?.data.email : payload.email,
        'user_id': isLoggedIn ? profile?.data.id : null,
        'phone': isLoggedIn ? profile?.data?.phone : payload.phone,
        'ship_address': isLoggedIn ? profile?.data?.address['apartment_number'] : payload.apartment_number,
        'ship_name': isLoggedIn ? profile?.data.name : payload.fullname,
        'method': payload.paymentMethod,
        'status': payload.paymentMethod === 'cod' ? 'processing' : 'pending',
        'coupon_code': coupon.data !== null ? coupon.data?.code : null,
        'discount': coupon.data !== null ? coupon.data?.amount : null,
        'city_id': isLoggedIn ? profile?.data?.address['city_id'] : payload.city_id,
        'district_id': isLoggedIn ? profile?.data?.address['district_id'] : payload.district_id,
        'ward_id': isLoggedIn ? profile?.data?.address['ward_id'] : payload.ward_id,
      },
      product: isLoggedIn ? dataCartUser?.data : dataCart?.data,
      total: coupon?.total ? coupon.total : dataCartUser?.total ? dataCartUser?.total : dataCart?.total
    }

    switch (payload.paymentMethod) {
      case 'cod':
        const checkoutCod = await checkout(params)
        localStorage.setItem('cart', JSON.stringify([]))
        removeAllCart()
        router.push('/order-success')
        break;
      case 'momo':
        const checkoutMomoQr = await checkoutMomo(params)
        removeAllCart()
        !isLoggedIn && localStorage.setItem('cart', JSON.stringify([]))
        router.push(checkoutMomoQr.redirect)
        break;
      default:
        const checkoutVnPay = await checkoutVnpay(params)
        removeAllCart()
        !isLoggedIn && localStorage.setItem('cart', JSON.stringify([]))
        router.push(checkoutVnPay.redirect)
        break;
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

  if (isLoadingLoggedIn === true || isLoadingCart === true || isLoading === true) return <Box><Loading></Loading></Box>;
  if (cartError || cartUserError) return <><NotFound /></>
  return (
    <>
      <Box sx={{ width: '100%', maxWidth: '1360px', margin: 'auto' }}>
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={2}>
          <Box flex={1} padding={'25px'}>
            <Box textAlign={'right'}>
              {isLoggedIn === true ? "" :
                <Box>
                  <Typography component={'span'}>Có tài khoản? </Typography>
                  <Link href={`/login?back_to=${encodeUrl(pathname)}`} style={{ color: '#6EA7CF', textDecorationLine: 'underline' }}>Đăng nhập</Link>
                </Box>}
            </Box>
            {isLoggedIn === true && <Box boxShadow={'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'} padding={'25px'} borderRadius={'10px'}>
              <Box>
                <Typography variant="h5">Giao tới</Typography>
              </Box>
              <Box>
                <Typography component={'span'} fontWeight={600}>{profile?.data?.name}</Typography>
                <Typography component={'span'} marginLeft={'15px'}>{profile?.data?.phone}</Typography>
              </Box>
              <Box>
                <Typography>{profile?.data?.address?.apartment_number}</Typography>
              </Box>
            </Box>}

            <Box>
              <CheckoutForm cities={cities?.data} onSubmit={handleCheckout}></CheckoutForm>
            </Box>
          </Box>

          <Box sx={{ backgroundColor: '#FCF9F4', padding: '25px' }}>
            <CheckoutInfo cart={isLoggedIn ? dataCartUser?.data : dataCart?.data}></CheckoutInfo>
            <Box marginBlockStart={'25px'}>
              <CheckoutDiscountForm onCouponCart={handleCouponCart} coupon={searchParams.get('coupon')}></CheckoutDiscountForm>
            </Box>
            <Box marginBlockStart={'25px'}>
              <CheckoutTotal total={isLoggedIn ? dataCartUser?.total! : dataCart?.total!} coupon={coupon}></CheckoutTotal>
            </Box>
          </Box>
        </Stack >
      </Box >
    </>
  )
}