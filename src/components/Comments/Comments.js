import React, { useState, useEffect } from "react";
import "./Comments.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import timeDifferenceForDate from "../utils";

const ADD_COMMENT = gql`
  mutation($text: String!, $linkId: ID!) {
    createComment(text: $text, linkId: $linkId) {
      text
    }
  }
`;

const Comments = ({ comments, linkId }) => {
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
            {comments.map(comment => (
              <div key={comment.id}>
                <div className="comment-user">
                  <span>{comment.user.username}</span>{" "}
                  <span>{timeDifferenceForDate(comment.createdAt)}</span>
                </div>
                <div className="comment-text">
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </Mutation>
  );
};

export default Comments;
