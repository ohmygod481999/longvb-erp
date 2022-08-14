import { gql } from "@apollo/client";

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

export const CREATE_STORE = gql`
    mutation createStore($name: String) {
        insert_store_one(object: { name:$name }) {
            id
        }
    } 
`;


export const UPDATE_STORE = gql`
    mutation UpdateStore ($id: Int!, $new_name: String!) {
        update_store_by_pk (
            pk_columns: {id: $id}
            _set: { name: $new_name }
        ) {
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