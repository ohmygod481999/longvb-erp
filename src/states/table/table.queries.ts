import { gql } from "@apollo/client";

export const GET_TABLES_PAGINATION = gql`
    query getTablePagination($zone_id: Int!, $limit: Int!, $offset: Int!) {
        res_table(
            where: { zone_id: { _eq: $zone_id } }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            id
            name
            res_zone {
                id
                name
                created_at
            }
            created_at
        }
        res_table_aggregate(where: { zone_id: { _eq: $zone_id } }) {
            aggregate {
                totalCount: count
            }
        }
    }
`;
