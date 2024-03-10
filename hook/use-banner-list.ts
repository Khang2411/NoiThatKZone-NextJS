'use client'
import { bannerApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseBannerProps {
    options?: SWRConfiguration
}

export function useBanner({  options }: UseBannerProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_HOME_BANNER],
        () => bannerApi.getBannerHomePage(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}