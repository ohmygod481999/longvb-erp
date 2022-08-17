import { gql } from "@apollo/client";

export const DELETE_MULTI_PRODUCT = gql`
    mutation deleteMultiProduct($ids: [Int!]) {
        delete_product(where: {id: {_in: $ids}}) {
            affected_rows
          }
    }
`;