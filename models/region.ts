export interface Cities {
    id: number,
    name: string,
    type: string,
    slug: string,
    updated_at: string,
    created_at: string,
}

export interface Districts {
    id: number,
    name: string,
    type: string,
    city_id: number,
    updated_at: string,
    created_at: string,
}
export interface Wards {
    id: number,
    name: string,
    type: string,
    district_id: number,
    updated_at: string,
    created_at: string,
}