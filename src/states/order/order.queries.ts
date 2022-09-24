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

export const GET_CREATED_ORDER = gql`
    query getOrderCreated($company_id: Int!) {
        order(
            where: {
                status: { _eq: "created" }
                company_id: { _eq: $company_id }
            }
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
    }
`;

const GET_ORDER_DATE_RANGE = gql`
    query getOrderDateRange(
        $company_id: Int!
        $start: timestamptz!
        $end: timestamptz!
    ) {
        order(
            where: {
                company_id: { _eq: $company_id }
                created_at: { _gt: $start, _lt: $end }
            }
        ) {
            order_items {
                product {
                    price
                }
                quantity
            }
            store {
                id
                name
            }
            created_at
        }
    }
`;

const GET_COUNT_ORDER_DATE_RANGE = gql`
    query getCountOrderDateRange(
        $company_id: Int!
        $start: timestamptz!
        $end: timestamptz!
    ) {
        order_aggregate(
            where: {
                company_id: { _eq: $company_id }
                created_at: { _gt: $start, _lt: $end }
                status: { _eq: "success" }
            }
        ) {
            aggregate {
                totalCount: count
                __typename
            }
            __typename
        }
    }
`;

export const orderQueries = {
    GET_ORDERS_PAGINATION,
    GET_CREATED_ORDER,
    GET_ORDER_DATE_RANGE,
    GET_COUNT_ORDER_DATE_RANGE,
};
