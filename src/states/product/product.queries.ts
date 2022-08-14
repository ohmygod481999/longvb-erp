import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT_CATEGORY = gql`
    query getAllProductCategory {
        product_category {
            created_at
            id
            name
            updated_at
          }
    }
`;
export const CREATE_PRODUCT_CATEGORY = gql`
    mutation createProductCategory($name: String!) {
        insert_product_category_one(object: {name: $name}){
            created_at
            id
            name
            updated_at
        }
    } 
`;
export const UPDATE_PRODUCT_CATEGORY = gql`
    mutation updateProductCategory ($id: Int!, $new_name: String!) {
        update_product_category_by_pk (
            pk_columns: {id: $id}
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