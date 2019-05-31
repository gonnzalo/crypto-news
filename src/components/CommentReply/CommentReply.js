import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./CommentReply.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import UserContext from "../../UserContext";
import LoadingProgress from "../LoadingProgress";

const ADD_REPLY = gql`
  mutation($text: String!, $commentId: ID!, $isReply: Boolean!) {
    createComment(text: $text, commentId: $commentId, isReply: $isReply) {
      id
      text
      createdAt
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

const CommentReply = ({
  commentId,
  handleReply,
  handleLogin,
  handleSignUp
}) => {
  const [comment, setComment] = useState("");
  const isLoggedIn = useContext(UserContext);

  return (
    <Mutation mutation={ADD_REPLY}>
      {(addReply, { loading, error }) => {
        if (loading) return <LoadingProgress />;
        if (error) return `Error! ${error.message}`;
        return isLoggedIn ? (
          <div className="comments-container">
            <form
              className="comemnt-create"
              onSubmit={e => {
                e.preventDefault();
                addReply({
                  variables: { text: comment, commentId, isReply: true }
                });
                handleReply();
                setComment("");
              }}
            >
              <textarea
                name=""
                className="comment-textarea"
                onChange={e => setComment(e.target.value)}
                value={comment}
                placeholder="Insert a new reply"
              />
              <div className="submit-footer">
                <span className="btn-comment-filler" />
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleReply}
                >
                  Cancel
                </button>
                <input type="submit" value="reply" className="btn-comment" />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <span>
              Please{" "}
              <button
                type="button"
                onClick={handleLogin}
                className="btn-form-link"
              >
                login
              </button>{" "}
              or{" "}
              <button
                type="button"
                onClick={handleSignUp}
                className="btn-form-link"
              >
                sign-up
              </button>{" "}
              to comment.
            </span>
          </div>
        );
      }}
    </Mutation>
  );
};

CommentReply.propTypes = {
  commentId: PropTypes.string.isRequired,
  handleReply: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default CommentReply;
