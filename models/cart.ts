export interface Cart {
    id: number
    collection_id: number
    name: string
    price_before_discount: number
    price: number
    describe: string
    thumbnail: string
    slug: string
    is_featured: number
    is_hot: number
    stock: number
    updated_at: string
    created_at: string
    deleted_at: string
    quantity: number
}

export interface ResponseCart {
    data: Array<Cart>
    total: number
}

export interface CheckoutPayload {
    email?: string
    phone?: string,
    fullname?: string,
    apartment_number?: string,
    city_id?: string,
    district_id?: string,
    ward_id?: string,
    paymentMethod: string | any,
    total?: number
}