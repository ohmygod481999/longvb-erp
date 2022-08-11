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
