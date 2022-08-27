import { gql } from "@apollo/client";
export const GET_ALL_GALLERY = gql`
query MyQuery($company_id: Int!, $limit: Int , $offset: Int) {
    gallery(where: {company_id: {_eq: $company_id}}, limit: $limit, offset: $offset) {
      path
      id
     
    }
    gallery_aggregate {
        aggregate {
            totalCount: count
        }
      }
  }
`;