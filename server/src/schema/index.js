import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    links: [Link!]!
    users: [User!]
    user(id: ID!): User
    me: User
    comment(id: ID!): Comment!
    like(id: ID!): Like!
  }

  type Link {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    source: String!
    url: String!
    imageUrl: String!
    likes: [Like!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    comments: [Comment!]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    like(linkId: ID!): Like
    createComment(text: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
  type Token {
    token: String!
  }

  type Like {
    link: Link!
    userId: User!
  }

  type Comment {
    id: ID!
    text: String!
    userId: User!
  }
`;

export default schema;
