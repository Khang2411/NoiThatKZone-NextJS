import { ResponseCart, ResponseCoupon } from '@/models'
import axiosClient from './axios-client'

export const cartApi = {
	getAll(params: any): Promise<ResponseCart> {
		return axiosClient.post('/v1/cart', params)
	},

	getByUser(): Promise<ResponseCart> {
		return axiosClient.get('/v1/user/cart')
	},

	getStock(payload: { product_id: number, quantity: number }): Promise<{ message: string }> {
		return axiosClient.post('/v1/cart/stock', payload)
	},

	addToCart(payload: { product_id: number, quantity: number }) {
		return axiosClient.post('/v1/cart/add', payload)
	},

	addCoupon(payload: { coupon: string, total: number }): Promise<ResponseCoupon> {
		return axiosClient.post('/v1/cart/coupon', payload)
	},

	updateQuantity(payload: { product_id: number, quantity: number }) {
		return axiosClient.post('/v1/user/cart/quantity', payload)
	},

	removeCart(payload: { product_id: number }) {
		return axiosClient.post('/v1/user/cart/remove', payload)
	}
}