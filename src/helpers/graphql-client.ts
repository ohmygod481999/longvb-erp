import { ApolloClient, InMemoryCache } from '@apollo/client';
import { cache } from '../states/index.ts';

export const graphqlClient = new ApolloClient({
    uri: 'http://longvb.ddns.net:8082/v1/graphql',
    cache: cache,
  });