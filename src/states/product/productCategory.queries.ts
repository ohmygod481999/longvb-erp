import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT_CATEGORY = gql`
    query getAllProductCategory($company_id: Int!) {
        product_category(
            where: { company_id: { _eq: $company_id } }
            order_by: { created_at: desc }
        ) {
            created_at
            id
            name
            updated_at
        }
    }
`;
export const CREATE_PRODUCT_CATEGORY = gql`
    mutation createProductCategory($name: String!, $company_id: Int!) {
        insert_product_category_one(object: { name: $name, company_id: $company_id }) {
            created_at
            id
            name
            updated_at
        }
    }
`;
export const UPDATE_PRODUCT_CATEGORY = gql`
    mutation updateProductCategory($id: Int!, $new_name: String!) {
        update_product_category_by_pk(
            pk_columns: { id: $id }
            _set: { name: $new_name }
        ) {
            id
        }
    }
`;
export const DELETE_PRODUCT_CATEGORY = gql`
    mutation deleteProductCategory($id: Int!) {
        delete_product_category_by_pk(id: $id) {
            id
        }
    }
`;
