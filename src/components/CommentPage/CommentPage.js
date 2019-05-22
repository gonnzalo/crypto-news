import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "./CommentPage.css";

import CommentCreate from "../CommentCreate/CommentCreate";
import Comments from "../Comments/Comments";

const GET_COMMENTS = gql`
  query comments($linkId: ID!) {
    comments(linkId: $linkId) {
      id
      text
      createdAt
      isReply
      user {
        id
        username
      }
      replies {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const COMMENTS_SUBSCRIPTION = gql`
  subscription onCommentAdded {
    commentCreated {
      id
      text
      createdAt
      isReply
      user {
        id
        username
      }
      replies {
        isReply
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

let isSub = null;

const CommentPage = ({ linkId }) => {
  return (
    <>
      <CommentCreate linkId={linkId} />
      <Query query={GET_COMMENTS} variables={{ linkId }}>
        {({ loading, error, subscribeToMore, ...result }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          if (!isSub) {
            isSub = subscribeToMore({
              document: COMMENTS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.commentCreated;
                const { isReply } = newFeedItem.replies;
                console.log(newFeedItem.replies);
                if (newFeedItem.replies.length === 0) {
                  return Object.assign({}, prev, {
                    comments: [newFeedItem, ...prev.comments]
                  });
                }
                return Object.assign({}, prev, {
                  comments: [...prev.comments]
                });
              }
            });
          }

          return <Comments {...result} />;
        }}
      </Query>
    </>
  );
};

export default CommentPage;
