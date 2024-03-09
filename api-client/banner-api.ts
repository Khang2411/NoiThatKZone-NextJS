import { HomeBanner, Response } from '@/models'
import axiosClient from './axios-client'

export const bannerApi = {
    getBannerHomePage(): Promise<Response<HomeBanner>> {
        return axiosClient.get('/v1/home/banner')
    },
}