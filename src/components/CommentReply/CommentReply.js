import React, { useState, useEffect } from "react";
import "./CommentReply.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_REPLY = gql`
  mutation($text: String!, $commentId: ID!) {
    replyComment(text: $text, commentId: $commentId) {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const CommentReply = ({ commentId }) => {
  const [comment, setComment] = useState("");
  return (
    <Mutation mutation={ADD_REPLY}>
      {(addReply, { loading, error, data }) => {
        return (
          <div className="comments-container">
            <form
              className="comemnt-create"
              onSubmit={e => {
                e.preventDefault();
                addReply({ variables: { text: comment, commentId } });
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
