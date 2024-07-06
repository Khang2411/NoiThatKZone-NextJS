import { HomeProduct, ListParams, ListResponse, Product, Response } from '@/models'
import axiosClient from './axios-client'

export const listingApi = {
    getAll(params: Partial<ListParams>): Promise<ListResponse<Product>> {
        return axiosClient.get('/v1/listings', { params })
    },
    
    getBestSeller(): Promise<Response<HomeProduct>> {
        return axiosClient.get('/v1/home/best-seller')
    },

    getSimilar(productId: number): Promise<ListResponse<Product>> {
        return axiosClient.get(`/v1/listings/${productId}/similar`)
    },

    async get(id: number): Promise<Response<Product>> {
        return axiosClient.get(`/v1/listings/${id}`)
    },
}