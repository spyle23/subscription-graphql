import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { HttpLink, split } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

export const apolloClient = (
  token?: string
): ApolloClient<NormalizedCacheObject> => {
  const API_URI = process.env.REACT_APP_API_URI;
  const API_URI_WS = process.env.REACT_APP_API_URI_WS;

  const user = AuthStorage.isAuth();
  const httpLink = new HttpLink({
    uri: API_URI,
    headers: {
      authorization: `${token || user?.token}`,
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: API_URI_WS as string,
      lazy: true,
      connectionParams: {
        authentication: "",
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return client;
};
