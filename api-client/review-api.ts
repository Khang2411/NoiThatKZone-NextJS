import { ListResponse, ReplyPayload, Review } from '@/models'
import axiosClient from './axios-client'

export const reviewApi = {
    get(params: {product_id:number,page:number,limit:number}): Promise<ListResponse<Review>> {
        return axiosClient.get(`/v1/reviews`, { params })
    },

    add(payload: Partial<Review>) {
        return axiosClient.post("/v1/reviews/add", payload)
    },

    reply(payload: ReplyPayload) {
        return axiosClient.post("/v1/reviews/reply", payload)
    }
}
