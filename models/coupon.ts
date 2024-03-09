export interface Coupon {
    id: number
    name: string
    code: string
    type: string
    amount: number
    limit: number
    minimum_spend: number
    expire_at: string
    updated_at: string
    created_at: string
}
export interface ResponseCoupon {
    data: Coupon | null
    total?: number;
    discount?: number;
}