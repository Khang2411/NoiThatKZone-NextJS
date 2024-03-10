'use client'
import { listingApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseBestSellerProps {
    options?: SWRConfiguration
}

export function useBestSeller({ options }: UseBestSellerProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_LISTING_LIST],
        () => listingApi.getBestSeller(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}