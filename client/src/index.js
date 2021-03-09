import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache, typeDefs } from "./cache";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const client = new ApolloClient({
  cache,
  uri: "https://graphqlpokemon.favware.tech/",
  connectToDevTools: true,
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </ApolloProvider>,
  document.querySelector("#root")
);
