import { gql } from "@apollo/client";

const DELETE_MULTI_TABLE = gql`
    mutation deleteMultiTable($ids: [Int!]) {
        delete_res_table(where: { id: { _in: $ids } }) {
            affected_rows
        }
    }
`;

const ADD_TABLE = gql`
    mutation addTable($name: String!, $zone_id: Int!, $store_id: Int!) {
        insert_res_table_one(object: { name: $name, zone_id: $zone_id, store_id: $store_id }) {
            id
            name
            created_at
        }
    }
`;

export const tableMutations = {
    DELETE_MULTI_TABLE,
    ADD_TABLE,
};
