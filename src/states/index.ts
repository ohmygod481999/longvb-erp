import { InMemoryCache } from "@apollo/client";
import { authState } from "./auth/index";
import { dashboardState } from "./dashboard";

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          auth: {
            read () {
              return authState();
            }
          },
          dashboard: {
            read () {
              return dashboardState();
            }
          },
        }
      }
    }
  });