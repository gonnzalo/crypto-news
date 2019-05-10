import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    links: [Link!]!
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type Link {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    source: String!
    url: String!
    imageUrl: String!
    upVotes: [Vote!]!
    downVotes: [Vote!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    upVote(linkId: ID!): Vote
    downVote(linkId: ID!): Vote
  }
  type Token {
    token: String!
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }
`;

export default schema;
