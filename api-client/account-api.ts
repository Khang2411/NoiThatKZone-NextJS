import { RegisterPayload } from '@/models'
import axiosClient from './axios-client'

export const accountApi = {
    updateEmail(payload: Partial<RegisterPayload>) {
        return axiosClient.post('/v1/account/email/update', payload)
    },
    updatePhone(payload: Partial<RegisterPayload>) {
        return axiosClient.post('/v1/account/phone/update', payload)
    },
    updatePassword(payload: Partial<RegisterPayload>) {
        return axiosClient.post('/v1/account/password/update', payload)
    },
    updateAddress(payload: Partial<RegisterPayload>) {
        return axiosClient.post('/v1/account/address/update', payload)
    },
}