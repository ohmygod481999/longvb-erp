import { gql } from "@apollo/client";

export const GET_PRODUCT_PAGINATION = gql`
    query getProductPagination(
        $category_exp: Int_comparison_exp
        $company_id: Int!
        $limit: Int!
        $offset: Int!
    ) {
        product(
            where: {
                category_id: $category_exp
                company_id: { _eq: $company_id }
            }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            id
            name
            product_category {
                id
                name
            }
            description
            price
            status
            thumbnail
            created_at
        }
        product_aggregate(
            where: {
                category_id: $category_exp
                company_id: { _eq: $company_id }
            }
        ) {
            aggregate {
                totalCount: count
            }
        }
    }
`;

const GET_PRODUCT_BY_ID = gql`
    query getProductById($id: Int!) {
        product_by_pk(id: $id) {
            id
            name
            product_category {
                id
                name
            }
            description
            price
            thumbnail
        }
    }
`;

export const productQueries = {
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_PAGINATION
};
