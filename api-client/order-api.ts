import { DetailOrder, ListResponse, Order } from '@/models'
import axiosClient from './axios-client'

export const orderApi = {
    getAll(params: { status: string }): Promise<ListResponse<Order>> {
        return axiosClient.get('/v1/order/list', { params })
    },

    get(id: number): Promise<DetailOrder> {
        return axiosClient.get(`/v1/order/${id}`)
    },
}