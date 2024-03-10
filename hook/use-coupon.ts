'use client'
import { cartApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseCouponProps {
    params?: any
    options?: SWRConfiguration,
    enabled?: boolean
}

export function useCoupon({ params, options, enabled }: UseCouponProps) {
    const swrResponse = useSWR(
        enabled === false ? [QueryKeys.GET_COUPON, params] : null,
        () => cartApi.addCoupon(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )
    return { ...swrResponse }
}