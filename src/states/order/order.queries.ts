import { gql } from "@apollo/client";

export const GET_ORDERS_PAGINATION = gql`
    query getOrdersPagination(
        $store_exp: Int_comparison_exp
        $status_exp: order_status_enum_comparison_exp
        $company_id: Int!
        $limit: Int!
        $offset: Int!
    ) {
        order(
            where: {
                store_id: $store_exp
                company_id: { _eq: $company_id }
                status: $status_exp
            }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            id
            status
            order_items {
                id
                product {
                    id
                    name
                    thumbnail
                    description
                    price
                    product_category {
                        id
                        name
                    }
                }
                quantity
                created_at
                updated_at
            }
            store {
                id
                name
            }
            res_table {
                id
                name
            }
            created_at
        }
        order_aggregate(
            where: {
                store_id: $store_exp
                company_id: { _eq: $company_id }
                status: $status_exp
            }
        ) {
            aggregate {
                totalCount: count
            }
        }
    }
`;

export const orderQueries = {
    GET_ORDERS_PAGINATION,
};
