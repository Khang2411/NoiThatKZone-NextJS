'use client'
import { collectionApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface useCollectionHomeProps {
    options?: SWRConfiguration
    enabled?: boolean
}

export function useCollectionHomeList({ options, enabled }: useCollectionHomeProps) {
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_COLLECTION_LIST] : null,
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