import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

const httpLink = new HttpLink({
  uri: "https://crypto-news-server.herokuapp.com/graphql"
});

const wsLink = new WebSocketLink({
  uri: `wss://crypto-news-server.herokuapp.com/graphql`,
  options: {
    reconnect: true,
    timeout: 30000
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("x-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ""
    }
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
          if (
            message ===
            "Context creation failed: Your session expired. Sign in again."
          ) {
            return localStorage.removeItem("x-token");
          }
          return console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
