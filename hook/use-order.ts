'use client'
import useSWR, { SWRConfiguration } from 'swr'
import { QueryKeys } from '@/constants'
import { orderApi } from '@/api-client'

type UseOrderProps = {
    options?: Partial<SWRConfiguration>,
    params: any
}
export function useOrder({ options, params }: UseOrderProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_ORDER_LIST, params],
        () => orderApi.getAll(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            fallbackData: null,
            ...options,
        }
    )
    async function getOrderPending() {
        const orderList = await orderApi.getAll({ status: 'pending' });
        return orderList;

    }
    async function getOrderProcessing() {
        const orderList = await orderApi.getAll({ status: 'processing' });
        return orderList;

    }
    async function getOrderConfirmed() {
        const orderList = await orderApi.getAll({ status: 'confirmed' });
        return orderList;
    }
    async function getOrderCompleted() {
        const orderList = await orderApi.getAll({ status: 'completed' });
        return orderList;
    }
    async function getOrderCancelled() {
        const orderList = await orderApi.getAll({ status: 'cancelled' });
        return orderList;
    }
    return { ...swrResponse, getOrderPending, getOrderProcessing, getOrderConfirmed, getOrderCompleted, getOrderCancelled }
}