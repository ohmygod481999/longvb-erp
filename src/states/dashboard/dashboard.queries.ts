import { gql } from "@apollo/client";

export const GET_DASHBOARD = gql`
    query GetDashboard {
        dashboard @client {
            startDate
            endDate
        }
    }
`;
