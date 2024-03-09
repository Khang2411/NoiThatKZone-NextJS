export interface Banner {
    id: number,
    title?: string
    thumbnail: string
    url: string
    updated_at: string
    created_at: string
}

export interface HomeBanner {
    sliders: Array<Banner>
    banners: Array<Banner>
}