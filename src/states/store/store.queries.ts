import { gql } from "@apollo/client";
export const GET_ALL_COMPANY = gql`
    query getAllCompany {
        company {
            id
            name
        }
    }
`;
export const GET_ALL_STORES_OF_COMPANY = gql`
    query getAllStoreOfCompany($company_id: Int!) {
        store(where: { company_id: { _eq: $company_id } }) {
            id
            name
            company {
                id
                name
            }
            created_at
        }
    }
`;

export const GET_ALL_STORES = gql`
    query getAllStore($company_id: Int!) {
        store(where: { company_id: { _eq: $company_id } }) {
            id
            name
        }
    }
`;

export const CREATE_STORE = gql`
    mutation createStore($name: String!, $company_id: Int!) {
        insert_store_one(object: { name: $name, company_id: $company_id }) {
            id
        }
    }
`;

export const UPDATE_STORE = gql`
    mutation UpdateStore($id: Int!, $new_name: String!) {
        update_store_by_pk(pk_columns: { id: $id }, _set: { name: $new_name }) {
            id
        }
    }
`;
export const DELETE_STORE = gql`
    mutation deleteStore($id: Int!) {
        delete_store_by_pk(id: $id) {
            id
        }
    }
`;

export const CREATE_ZONE = gql`
    mutation createZone($name: String!, $store_id: Int!, $company_id: Int!) {
        insert_res_zone_one(
            object: {
                name: $name
                store_id: $store_id
                company_id: $company_id
            }
        ) {
            id
        }
    }
`;

// export type Zone = {
//     id: number
//     name: string
//     store_id: number
//     created_at: string
// }

export const GET_ALL_ZONE = gql`
    query getZones($company_id: Int!) {
        res_zone(where: { company_id: { _eq: $company_id } }) {
            id
            name
            store_id
            created_at
        }
    }
`;

export const GET_ZONE_BY_STORE_ID = gql`
    query getZones($company_id: Int!, $store_id: Int!) {
        res_zone(
            where: {
                company_id: { _eq: $company_id }
                store_id: { _eq: $store_id }
            }
        ) {
            id
            name
            store_id
            created_at
        }
    }
`;

export const UPDATE_ZONE = gql`
    mutation UpdateZone($id: Int!, $new_name: String!, $new_store_id: Int!) {
        update_res_zone_by_pk(
            pk_columns: { id: $id }
            _set: { name: $new_name, store_id: $new_store_id }
        ) {
            id
        }
    }
`;
export const DELETE_ZONE = gql`
    mutation deleteZone($id: Int!) {
        delete_res_zone_by_pk(id: $id) {
            id
        }
    }
`;
