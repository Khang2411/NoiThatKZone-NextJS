import { Collection, ListResponse, Response } from '@/models'
import axiosClient from './axios-client'

export const collectionApi = {
	getAll(): Promise<ListResponse<Collection>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/home/collections')
	},

	get(id: number): Promise<Response<Collection>> {
		return axiosClient.get(`/v1/collections/${id}`)
	},
}