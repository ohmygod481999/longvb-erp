import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    query GetAuth {
        auth @client {
            user {
                id
                company_id
            }
        }
    }
`;
