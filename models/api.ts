export interface ListParams {
	page: number | string
	limit: number
	title_like: string
	sort: string | null
	collection_id: string | number
}

export interface DetailParams {
	id: number | string | null
	user_id: number | string | null
}


export interface ListResponse<T> {
	data: Array<T>
	current_page?: number
	last_page?: number
}

export interface Response<T> {
	data: T
}


export interface ApiError {
	response: Object;
	error: string
}