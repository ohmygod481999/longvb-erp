import { GraphqlAggregate } from "./global.model";
export interface ProductCategory {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

export interface ProductCategoryResponse {
    product_category: ProductCategory[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    status: string;
    thumbnail: string;
    created_at: string;
    product_category: {
        id: number;
        name: string;
    };
}

export interface ProductsResponse {
    product: Product[];
    product_aggregate: GraphqlAggregate;
}

export interface ProductResponse {
    product_by_pk: Product;
}
