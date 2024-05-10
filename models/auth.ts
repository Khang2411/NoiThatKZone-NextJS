export interface LoginPayload {
	email: string
	password: string
}
export interface RegisterPayload {
	name: string
	email: string
	phone: string
	password: string
	password_confirmation: string
	apartment_number: string
	city_id: string
	district_id: string
	ward_id: string
}

export interface UserProfile {
	id: number,
	name: string,
	email: string,
	email_verified_at: string,
	phone: string,
	created_at: string,
	updated_at: string,
	profile_photo_url:string,
	address: any
}

