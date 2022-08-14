export interface ProductCategory {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

export interface ProductCategoryResponse {
    product_category : ProductCategory[];
}