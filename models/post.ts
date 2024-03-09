import { UserProfile } from "."

export interface Post {
    id: number
    slug: string,
    thumbnail: string
    title: string
    content: string
    user: UserProfile
    user_id: number
    created_at: string
    updated_at: string
}

export interface DetailPost {
    data: Post
    similar: Array<Post>
}
