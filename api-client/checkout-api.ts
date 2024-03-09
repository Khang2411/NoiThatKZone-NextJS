import axiosClient from './axios-client'

export const checkoutApi = {
	checkout(payload: any) {
		return axiosClient.post('/v1/checkout', payload)
	},
	checkoutMomo(payload: any): Promise<{ redirect: string }> {
		return axiosClient.post('/v1/checkout/momo', payload)
	},
	checkoutVnpay(payload: any): Promise<{ redirect: string }> {
		return axiosClient.post('/v1/checkout/vnpay', payload)
	},
}