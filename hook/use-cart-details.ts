'use client'
import { cartApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface useCartDetails {
    options?: SWRConfiguration
    enabled: Boolean
}

export function useCartDetails({ options, enabled }: useCartDetails) {
    const swrResponse = useSWR(
        enabled === true ? [QueryKeys.GET_CART_DETAIL] : null,
        () => cartApi.getByUser(),
        {
            dedupingInterval: 0,
            keepPreviousData: true,
            ...options,
        }
    )

    const updateQuantity = async (payload: any) => {
        const updateQuantity = await cartApi.updateQuantity(payload);
        return updateQuantity
    }

    const removeCart = async (payload: any) => {
        const removeCart = await cartApi.removeCart(payload);
        return removeCart
    }
    return { ...swrResponse, updateQuantity, removeCart }
}