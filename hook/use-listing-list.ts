'use client'
import { listingApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseListingListProps {
    params: Partial<ListParams>
    options?: SWRConfiguration
}

export function useListingList({ params, options }: UseListingListProps ) {
    const swrResponse = useSWR(
        [QueryKeys.GET_LISTING_LIST, params],
        () => listingApi.getAll(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            fallbackData: {
                data: [],
                pagination: {
                    page: 1,
                    limit: 10
                },
            },
            ...options,
        }
    )
    return { ...swrResponse }
}