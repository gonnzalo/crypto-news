import React, { useState } from "react";
import PropTypes from "prop-types";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import LoadingProgress from "../LoadingProgress";

const EDIT_REPLY = gql`
  mutation($text: String!, $commentId: ID!) {
    editComment(text: $text, id: $commentId) {
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

const CommentEdit = ({ commentId, handleEdit, text }) => {
  const [comment, setComment] = useState(text);

  return (
    <Mutation mutation={EDIT_REPLY}>
      {(editReply, { loading, error }) => {
        if (loading) return <LoadingProgress />;
        if (error) return `Error! ${error.message}`;
        return (
          <div className="comments-container">
            <form
              className="comemnt-create"
              onSubmit={e => {
                e.preventDefault();
                editReply({
                  variables: { text: comment, commentId }
                });
                handleEdit();
                setComment("");
              }}
            >
              <textarea
                name=""
                className="comment-textarea"
                onChange={e => setComment(e.target.value)}
                value={comment}
                placeholder="Edit comment"
              />
              <div className="submit-footer">
                <span className="btn-comment-filler" />
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleEdit}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <input type="submit" value="edit" className="btn-comment" />
              </div>
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};

CommentEdit.propTypes = {
  commentId: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default CommentEdit;
