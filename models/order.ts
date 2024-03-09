import { Product } from "."

export interface Order {
    id: number
    user_id: number
    momo_id: number
    vnpay_id: number
    method: string
    status: string
    phone: string
    ship_name: string
    ship_address: string
    city_id: number
    district_id: number
    ward_id: number
    coupon_code: string
    discount: number
    updated_at: string
    created_at: string
    deleted_at: string
    products: Array<Product>
}

export interface DetailOrder {
    data: Order
    subTotal: number
    total: number
    sumDiscount: number | null
}