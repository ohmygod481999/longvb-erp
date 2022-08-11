import { InMemoryCache } from "@apollo/client";
import { authState } from "./auth/index";

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          auth: {
            read () {
              return authState();
            }
          },
        }
      }
    }
  });