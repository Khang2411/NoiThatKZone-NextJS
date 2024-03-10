'use client'
import { cartApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseCartProps {
	params?: any
	options?: SWRConfiguration,
	enabled?: boolean
}

export function useCart({ params, options, enabled }: UseCartProps) {
	const swrResponse = useSWR(
		enabled === true ? [QueryKeys.GET_CART_LIST, params] : null,
		() => cartApi.getAll(params),
		{
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			revalidateOnFocus: true,
			...options,
		}
	)

	async function checkStock(payload: any) {
		const cart = await cartApi.getStock(payload)
		return cart
	}

	async function addToCart(payload: any) {
		const cart = await cartApi.addToCart(payload)
		return cart
	}

	async function addCoupon(payload: any) {
		const cart = await cartApi.addCoupon(payload)
		return cart
	}
	return { ...swrResponse, checkStock, addToCart, addCoupon }
}