import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    feed: Feed!
  }

  type Feed {
    links: [Link!]!
    count: Int!
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

  type Mutation {
    fechtData(url: String!): Feed
  }
`;

export default schema;
