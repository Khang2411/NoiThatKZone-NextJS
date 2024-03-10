'use client'
import { orderApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseOrderDetailsProps {
    orderId: number
    options?: SWRConfiguration
}

export function useOrderDetails({ orderId, options }: UseOrderDetailsProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_ORDER_DETAIL, orderId],
        () => orderApi.get(orderId),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )
    return { ...swrResponse }
}