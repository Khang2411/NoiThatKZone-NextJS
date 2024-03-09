import { accountApi } from '@/api-client'

export function useAccount() {
    async function updateEmail(payload: { email: string }) {
        const updateEmail = await accountApi.updateEmail(payload)
        return updateEmail
    }
    async function updatePhone(payload: { phone: string }) {
        const updatePhone = await accountApi.updatePhone(payload)
        return updatePhone
    }
    async function updatePassword(payload: { password: string }) {
        const updatePassword = await accountApi.updatePassword(payload)
        return updatePassword
    }
    async function updateAddress(payload: any) {
        const updateAddress = await accountApi.updateAddress(payload)
        return updateAddress
    }

    return { updateEmail, updatePhone, updatePassword, updateAddress }
}