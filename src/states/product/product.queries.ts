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
