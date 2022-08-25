import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    query GetAuth {
        auth @client {
            user {
                id
                company_id
                name
                facebook
                email
                phone
                avatar
                user_erp_id
            }
        }
    }
`;

export const GET_OAUTH_URL = gql`
    query getOAuthUrl {
        oauthUrl {
            data {
                url
            }
        }
    }
`;

export const GET_ACCOUNT_INFO = gql`
    query getAccountInfo {
        accountInfo {
            company_id
            email
            facebook
            name
            phone
            id
            user_erp_id
            avatar
        }
    }
`;
