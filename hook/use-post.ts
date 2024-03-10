'use client'
import { postApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'


export interface UsePostProps {
    params: Partial<ListParams>
    options?: SWRConfiguration
}

export function usePost({ params, options }: UsePostProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_POST_HOMEPAGE_LIST, params],
        () => postApi.getPostHomePage(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )
    return swrResponse
}