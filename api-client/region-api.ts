import { Districts, Wards, Cities, ListResponse } from '@/models'
import axiosClient from './axios-client'

export const regionApi = {
	getCities(): Promise<ListResponse<Cities>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/cities')
	},

	getDistricts(cityId: number): Promise<ListResponse<Districts>> {
		return axiosClient.get(`/v1/districts/${cityId}`)
	},

	getWards(districtId: number): Promise<ListResponse<Wards>> {
		return axiosClient.get(`/v1/wards/${districtId}`)
	},
}