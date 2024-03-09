import { Collection } from "."

export interface Product {
	id: number
	collection_id: number
	collection: Collection
	thumbnail: string
	describe: string
	is_featured: boolean | number
	is_hot: boolean | number
	price: any
	price_before_discount: number
	slug: string
	name: string
	stock: number
	tagList: string[]
	created_at: string
	updated_at: string
}

export interface HomeProduct {
	list_best_seller: Array<Product>
	list_featured_office: Array<Product>
}