import { UserProfile } from "."

export interface Review {
    id: number
    user_id: number
    user_name?: string
    product_id: number
    review_id: number
    content: string
    rating: number
    status: string
    updated_at: string
    created_at: string
    deleted_at: string
    user: Partial<UserProfile>
    replies: Array<Review>
}

export interface ReplyPayload {
    product_id: number
    reply: string
    review_id: number
    user_id: number
}