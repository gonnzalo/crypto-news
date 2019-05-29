import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    links(first: Int, offset: Int): [Link!]!
    link(id: ID!): Link
    users: [User!]
    user(id: ID!): User
    me: User
    comments(linkId: ID!): [Comment!]!
    like(id: ID!): Like!
  }

  type Link {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    source: String!
    url: String!
    imgUrl: String!
    upLikes: String!
    downLikes: String!
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
    likeLink(linkId: ID!, isPositive: Boolean!): Like!
    createComment(
      text: String!
      linkId: ID
      commentId: ID
      isReply: Boolean!
    ): Comment!
    replyComment(text: String!, commentId: ID!): Comment!
    editComment(id: ID!, text: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
  type Token {
    token: String!
  }

  type Like {
    link: Link!
    user: User!
    isPositive: Boolean
  }

  type Subscription {
    commentCreated: Comment
    commentReplied: Comment
    commentDeleted: Comment
    commentEdited: Comment
    likeCreated: Like
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    replies: [Comment!]!
    isReply: Boolean!
  }

  type Reply {
    id: ID
    text: String
    user: User
    createdAt: String
    updatedAt: String
  }
`;

export default schema;
