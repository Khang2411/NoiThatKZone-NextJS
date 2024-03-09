import { checkoutApi } from '@/api-client'

export function useCheckout() {

    async function checkout(payload: any) {
        await checkoutApi.checkout(payload)
    }
    async function checkoutMomo(payload: any) {
        const checkoutMomo = await checkoutApi.checkoutMomo(payload)
        return checkoutMomo;
    }
    async function checkoutVnpay(payload: any) {
        const checkoutVnpay = await checkoutApi.checkoutVnpay(payload)
        return checkoutVnpay;
    }
    return {
        checkout, checkoutMomo, checkoutVnpay
    }
}