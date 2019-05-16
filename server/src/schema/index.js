import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    links: [Link!]!
    link(id: ID!): Link
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
    likeLink(linkId: ID!, isPositive: Boolean!): Like!
    createComment(text: String!, linkId: ID!): Comment!
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
    commentCreated: CommentCreated!
    commentDeleted: CommentDeleted!
    commentEdited: CommentEdit!
    likeCreated: LikeCreated!
  }

  type CommentCreated {
    comment: Comment!
  }

  type CommentDeleted {
    comment: Comment!
  }

  type CommentEdit {
    comment: Comment!
  }

  type LikeCreated {
    like: Like!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;

export default schema;
