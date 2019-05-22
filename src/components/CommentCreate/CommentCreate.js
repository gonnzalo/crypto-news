import React, { useState, useEffect } from "react";
import "./CommentCreate.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

const CommentCreate = ({ linkId }) => {
  const [comment, setComment] = useState("");
  return (
    <Mutation mutation={ADD_COMMENT}>
      {(addComment, { loading, error, data }) => {
        return (
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
              />
              <input type="submit" value="comment" className="btn-comment" />
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};

export default CommentCreate;
