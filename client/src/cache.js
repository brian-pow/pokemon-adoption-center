import { InMemoryCache, gql, makeVar } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return loggedInVar();
        },
      },
    },
  },
});

export const loggedInVar = makeVar(false);
