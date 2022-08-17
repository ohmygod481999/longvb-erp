import { gql } from "@apollo/client";

export const GET_PRODUCT_PAGINATION = gql`
    query getProductPagination($category_id: Int!,$store_id: Int! , $limit: Int!, $offset: Int!) {
        product(
            where: {
                category_id: {_eq: $category_id}, store_id: {_eq: $store_id}}
                limit: $limit
                offset: $offset
                order_by: { created_at: desc }) 
            {
            id
            name
            description
            price
            status
            thumbnail
            created_at
          }
          product_aggregate(where: {category_id: {_eq: $category_id}, store_id: {_eq: $store_id}}) {
            aggregate {
                totalCount: count
            }
          }
    }
`;