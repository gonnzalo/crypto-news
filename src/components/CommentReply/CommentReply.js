import React, { useState, useEffect } from "react";
import "./CommentReply.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

const CommentReply = ({ commentId }) => {
  const [comment, setComment] = useState("");
  return (
    <Mutation mutation={ADD_REPLY}>
      {(addReply, { loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div className="comments-container">
            <form
              className="comemnt-create"
              onSubmit={e => {
                e.preventDefault();
                addReply({
                  variables: { text: comment, commentId, isReply: true }
                });
                setComment("");
              }}
            >
              <textarea
                name=""
                className="comment-textarea"
                onChange={e => setComment(e.target.value)}
                value={comment}
              />
              <input type="submit" value="comment" className="btn-comment" />
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};

export default CommentReply;
