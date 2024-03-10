'use client'
import { postApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { DetailParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'

export interface UsePostDetailsProps {
    params: Partial<DetailParams>
    options?: SWRConfiguration
}

export function usePostDetails({ params, options }: UsePostDetailsProps) {

    const swrResponse = useSWR(
        [QueryKeys.GET_POST_DETAIL, params],
        () => postApi.get(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}