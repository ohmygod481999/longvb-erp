import { gql } from "@apollo/client";

export const GET_ALL_ZONE = gql`
    query getAllZone($store_id: Int!) {
        res_zone(where: { store_id: { _eq: $store_id } }) {
            id
            name
            store {
                id
                name
                created_at
            }
            created_at
        }
    }
`;
