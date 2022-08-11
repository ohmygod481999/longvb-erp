import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphqlClient = new ApolloClient({
    uri: 'http://longvb.ddns.net:8082/v1/graphql',
    cache: new InMemoryCache(),
  });