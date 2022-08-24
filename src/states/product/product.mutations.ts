import { gql } from "@apollo/client";

export const DELETE_MULTI_PRODUCT = gql`
    mutation deleteMultiProduct($ids: [Int!]) {
        delete_product(where: { id: { _in: $ids } }) {
            affected_rows
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct(
        $name: String!
        $price: float8!
        $category_id: Int!
        $thumbnail: String
        $description: String
        $company_id: Int!
    ) {
        insert_product_one(
            object: {
                name: $name
                price: $price
                category_id: $category_id
                thumbnail: $thumbnail
                description: $description
                company_id: $company_id
            }
        ) {
            id
            name
            price
            category_id
            thumbnail
            description
            company_id
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProduct(
        $id: Int!
        $name: String!
        $price: float8!
        $category_id: Int!
        $thumbnail: String
        $description: String
        $company_id: Int!
    ) {
        update_product_by_pk(
            pk_columns: { id: $id }
            _set: {
                name: $name
                price: $price
                category_id: $category_id
                thumbnail: $thumbnail
                description: $description
                company_id: $company_id
            }
        ) {
            id
            name
            price
            category_id
            thumbnail
            description
            company_id
        }
    }
`;

export const productMutations = {
    DELETE_MULTI_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
};
