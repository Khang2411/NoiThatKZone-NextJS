export interface Collection {
	id: number
	slug: string,
	collection_id: number,
	collections: Array<Collection>
	banner: string
	thumbnail: string
	name: string
	created_at: string
	updated_at: string
}

export interface CollectionFiltersPayload {
	search: string
}