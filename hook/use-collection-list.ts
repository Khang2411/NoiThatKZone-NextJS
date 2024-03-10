'use client'
import { collectionApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface useCollectionHomeProps {
    options?: SWRConfiguration
    enabled?: boolean
}

export function useCollectionHomeList({ options }: useCollectionHomeProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_COLLECTION_LIST],
        () => collectionApi.getAll(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            fallbackData: null,
            ...options,
        }
    )

    return swrResponse
}