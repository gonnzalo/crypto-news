import React, { useState, useEffect } from "react";
import "./CommentCreate.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_COMMENT = gql`
  mutation($text: String!, $linkId: ID!) {
    createComment(text: $text, linkId: $linkId) {
      text
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
                addComment({ variables: { text: comment, linkId } });
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
