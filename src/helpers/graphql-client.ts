import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { cache } from "../states";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from ".";
import { constants } from "../Components/constants";

const httpLink = createHttpLink({
    uri: "https://longvb.ddns.net:8083/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getCookie(constants.AUTH_KEY);
    const refresh_token = getCookie(constants.REFRESH_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
            refreshtoken: refresh_token || "",
        },
    };
});

export const graphqlClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
});
