import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LoadingProgress from "../LoadingProgress";

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

const CommentPage = ({ linkId, handleSignUp, handleLogin }) => {
  return (
    <>
      <CommentCreate
        linkId={linkId}
        handleSignUp={handleSignUp}
        handleLogin={handleLogin}
      />
      <Query query={GET_COMMENTS} variables={{ linkId }}>
        {({ loading, error, subscribeToMore, data: { comments } }) => {
          const styleSpinner = {
            margin: "300px"
          };
          if (loading)
            return (
              <div style={styleSpinner}>
                <LoadingProgress />
              </div>
            );
          if (error) return `Error! ${error.message}`;

          if (!isSub) {
            isSub = subscribeToMore({
              document: COMMENTS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.commentCreated;
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

          return comments.map(comment => (
            <Comments
              comment={comment}
              key={comment.id}
              handleSignUp={handleSignUp}
              handleLogin={handleLogin}
            />
          ));
        }}
      </Query>
    </>
  );
};

CommentPage.propTypes = {
  linkId: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default CommentPage;
