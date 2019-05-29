import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./CommentCreate.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import UserContext from "../../UserContext";

const ADD_COMMENT = gql`
  mutation($text: String!, $linkId: ID!, $isReply: Boolean!) {
    createComment(text: $text, linkId: $linkId, isReply: $isReply) {
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

const CommentCreate = ({ linkId, handleLogin, handleSignUp }) => {
  const [comment, setComment] = useState("");
  const isLoggedIn = useContext(UserContext);
  return (
    <Mutation mutation={ADD_COMMENT}>
      {(addComment, { loading, error, data }) => {
        return isLoggedIn ? (
          <div className="comments-container">
            <form
              className="comemnt-create"
              onSubmit={e => {
                e.preventDefault();
                addComment({
                  variables: { text: comment, linkId, isReply: false }
                });
                setComment("");
              }}
            >
              <textarea
                name=""
                className="comment-textarea"
                onChange={e => setComment(e.target.value)}
                value={comment}
                placeholder="Insert a new comment"
              />
              <div className="submit-footer">
                <span className="btn-comment-filler" />
                <input type="submit" value="comment" className="btn-comment" />
              </div>
            </form>
          </div>
        ) : (
          <div className="noUser">
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

CommentCreate.propTypes = {
  linkId: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default CommentCreate;
