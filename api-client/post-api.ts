import { DetailParams, DetailPost, ListParams, ListResponse, Post } from '@/models'
import axiosClient from './axios-client'

export const postApi = {
    getPostHomePage(params: Partial<ListParams>): Promise<ListResponse<Post>> {
        return axiosClient.get('/v1/home/posts', { params })
    },

    get(params: Partial<DetailParams>): Promise<DetailPost> {
        return axiosClient.get('/v1/posts', { params })
    },
}