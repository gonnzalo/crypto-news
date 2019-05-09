import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    links: [Link!]!
  }

  type Link {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    source: String!
    url: String!
    imageUrl: String!
    upVotes: Int!
    downVotes: Int!
  }
`;

export default schema;
