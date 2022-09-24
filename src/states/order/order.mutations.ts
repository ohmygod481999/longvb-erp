import { gql } from "@apollo/client";

const DELETE_ORDER = gql`
    mutation deleteOrder($id: Int!) {
        delete_order(where: { id: { _eq: $id } }) {
            affected_rows
        }
    }
`;

const CREATE_ORDER = gql`
    mutation insertOrder($company_id: Int!, $store_id: Int!, $table_id: Int!) {
        insert_order_one(
            object: {
                company_id: $company_id
                store_id: $store_id
                table_id: $table_id
            }
        ) {
            id
            status
        }
    }
`;

const ADD_ITEM_ORDER = gql`
    mutation addItemOrder($order_id: Int!, $product_id: Int!) {
        insert_order_items_one(
            object: {
                order_id: $order_id
                product_id: $product_id
                quantity: 1
                status: "created"
            }
        ) {
            id
            status
            product_id
            order_id
            created_at
            status
            note
        }
    }
`;

const UPDATE_STATUS_ORDER = gql`
    mutation updateStatusOrder($id: Int!, $status: order_status_enum!) {
        update_order_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
            id
            status
        }
    }
`;

export const orderMutations = {
    DELETE_ORDER,
    CREATE_ORDER,
    ADD_ITEM_ORDER,
    UPDATE_STATUS_ORDER,
};
