'use client'
import { reviewApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseReviewListProps {
    params: any
    options?: SWRConfiguration
}

export function useReviewList({ params, options }: UseReviewListProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_REVIEW_LIST, params],
        () => reviewApi.get(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )
    async function addReview(payload: any) {
        const review = await reviewApi.add(payload)
        return review
    }
    async function reply(payload: any) {
        const review = await reviewApi.reply(payload)
        return review
    }

    return { ...swrResponse, addReview, reply }
}