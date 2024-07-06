'use client'
import { listingApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseWorkDetailsProps {
    productId: number
    options?: SWRConfiguration
    enabled?: boolean
}

export function useProductDetails({ productId, options }: UseWorkDetailsProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_PRODUCT_DETAIL, productId],
        () => listingApi.get(productId),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            fallbackData: null,
            ...options,
        }
    )

    return swrResponse
}