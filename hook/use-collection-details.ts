'use client'
import { collectionApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseWorkDetailsProps {
    collectionId: number
    options?: SWRConfiguration
    enabled?: boolean
}

export function useCollectionDetails({ collectionId, options, enabled = true }: UseWorkDetailsProps) {
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_COLLECTION_DETAIL, collectionId] : null,
        () => collectionApi.get(collectionId),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            fallbackData: null,
            ...options,
        }
    )

    return { ...swrResponse }
}