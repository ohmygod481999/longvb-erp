import { gql } from "@apollo/client";

export const GET_TABLES_PAGINATION = gql`
    query getTablePagination(
        $where: res_table_bool_exp!
        $limit: Int!
        $offset: Int!
    ) {
        res_table(
            where: $where
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            id
            name
            store {
                id
                name
            }
            res_zone {
                id
                name
                created_at
            }
            created_at
        }
        res_table_aggregate(where: $where) {
            aggregate {
                totalCount: count
            }
        }
    }
`;

export const GET_TABLE_QR_CODE = gql`
    query getTableQrCode($table_id: Int!) {
        tableQrCode(table_id: $table_id) {
            url
        }
    }
`;

export const GET_TABLES_WHERE = gql`
    query getTableWhere($where: res_table_bool_exp!) {
        res_table(where: $where, order_by: { created_at: desc }) {
            id
            name
            store {
                id
                name
            }
            res_zone {
                id
                name
                created_at
            }
            created_at
        }
    }
`;
