'use client'
import { listingApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseProductSimilarProps {
    productId: number
    options?: SWRConfiguration
}

export function useProductSimilar({ productId, options }: UseProductSimilarProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_PRODUCT_SIMILAR, productId],
        () => listingApi.getSimilar(productId),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            fallbackData: null,
            ...options,
        }
    )
    return swrResponse
}