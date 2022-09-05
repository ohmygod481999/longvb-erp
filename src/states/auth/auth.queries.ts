import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    query GetAuth {
        auth @client {
            user {
                id
                company_id
                company {
                    id
                    name
                    created_at
                }
                email
                user_erp_id
                account_info {
                    name
                    facebook
                    phone
                    avatar
                }
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
            company {
                id
                name
            }
            email
            id
            user_erp_id
            account_info {
                name
                facebook
                phone
                avatar
            }
        }
    }
`;
