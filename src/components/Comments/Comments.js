import React, { useState } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import timeDifferenceForDate from "../utils";

import CommentReply from "../CommentReply/CommentReply";
import CommentEdit from "../CommentEdit/CommentEdit";

import "./Comments.css";

const GET_USER = gql`
  query user {
    me {
      id
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation($commentId: ID!) {
    deleteComment(id: $commentId) {
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

const Reply = ({
  reply,
  userId,
  commentId,
  handleSignUp,
  handleLogin,
  last,
  index
}) => {
  const [deleteReplyActive, setDeleteReplyActive] = useState(false);
  const [replyActive, setReplyActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const mediaQuerySmall = useMediaQuery("(max-width:680px)");

  const handleReply = () => {
    return setReplyActive(false);
  };

  const handleEdit = () => {
    return setEditActive(false);
  };

  return (
    <>
      <div
        key={reply.id}
        className={`comment-container ${reply.user.id === userId &&
          "userOwner"}`}
      >
        <div className="comment-header">
          <span className="comment-user">{reply.user.username}</span>{" "}
          <span className="time-ago">
            {timeDifferenceForDate(reply.createdAt)} ago
          </span>
        </div>
        <div className="comment-text">
          <p
            className={
              reply.text === "-- Comment Delete --" ? "delete-style" : ""
            }
          >
            {reply.text}
          </p>
        </div>
        <div className="comment-footer">
          {last === index && (
            <button
              type="button"
              className="button-reply"
              onClick={() => setReplyActive(!replyActive)}
              aria-label="Reply"
            >
              Reply{" "}
            </button>
          )}
          {reply.user.id === userId && reply.text !== "-- Comment Delete --" && (
            <div className="edit-container">
              <button
                type="button"
                className="button-reply button-edit"
                onClick={() => setEditActive(!editActive)}
                aria-label="Edit"
              >
                Edit
              </button>
              <button
                type="button"
                className="button-reply button-delete"
                onClick={() => setDeleteReplyActive(!deleteReplyActive)}
                aria-label="Delete"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {deleteReplyActive && (
          <div className="delete-container">
            {!mediaQuerySmall && (
              <span> Are you sure you want to delete your comment ?</span>
            )}
            <span className="btns-delete">
              <Mutation
                mutation={DELETE_COMMENT}
                variables={{ commentId: reply.id }}
                onCompleted={() => setDeleteReplyActive(!setDeleteReplyActive)}
              >
                {deleteComment => {
                  return (
                    <button
                      type="button"
                      className="delete-comment"
                      onClick={deleteComment}
                      aria-label="Delete"
                    >
                      Delete
                    </button>
                  );
                }}
              </Mutation>
              <button
                type="button"
                className="cancel-delete"
                onClick={() => setDeleteReplyActive(!deleteReplyActive)}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </span>
          </div>
        )}
        {editActive && (
          <CommentEdit
            commentId={reply.id}
            text={reply.text}
            handleEdit={handleEdit}
          />
        )}
        {last === index && replyActive && (
          <CommentReply
            commentId={commentId}
            handleReply={handleReply}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
          />
        )}
      </div>
    </>
  );
};

const Comments = ({ comment, handleSignUp, handleLogin }) => {
  const [replyActive, setReplyActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const mediaQuerySmall = useMediaQuery("(max-width:680px)");

  const { replies } = comment;

  // close reply after submit
  const handleReply = () => {
    return setReplyActive(false);
  };

  const handleEdit = () => {
    return setEditActive(false);
  };

  return (
    <Query query={GET_USER}>
      {({ data }) => {
        let id = null;
        if (data.me) {
          // eslint-disable-next-line prefer-destructuring
          id = data.me.id;
        }
        return (
          <>
            <div
              key={comment.id}
              className={`comment-container ${
                comment.user.id === id ? "userOwner" : ""
              }`}
            >
              <div className="comment-header">
                <span className="comment-user">{comment.user.username}</span>
                <span className="time-ago">
                  {timeDifferenceForDate(comment.createdAt)} ago
                </span>
              </div>
              <div className="comment-text">
                <p
                  className={
                    comment.text === "-- Comment Delete --"
                      ? "delete-style"
                      : ""
                  }
                >
                  {comment.text}
                </p>
              </div>
              <div className="comment-footer">
                {replies.length < 1 && (
                  <button
                    type="button"
                    className="button-reply"
                    onClick={() => setReplyActive(!replyActive)}
                    aria-label="Reply"
                  >
                    Reply
                  </button>
                )}
                {comment.user.id === id &&
                  comment.text !== "-- Comment Delete --" && (
                    <div className="edit-container">
                      <button
                        type="button"
                        className="button-reply button-edit"
                        onClick={() => setEditActive(!editActive)}
                        aria-label="Edit"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="button-reply button-delete"
                        onClick={() => setDeleteActive(!deleteActive)}
                        aria-label="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
            {deleteActive && (
              <div className="delete-container">
                {!mediaQuerySmall && (
                  <span> Are you sure you want to delete your comment ?</span>
                )}
                <span className="btns-delete">
                  <Mutation
                    mutation={DELETE_COMMENT}
                    variables={{ commentId: comment.id }}
                    onCompleted={() => setDeleteActive(!setDeleteActive)}
                  >
                    {deleteComment => {
                      return (
                        <button
                          type="button"
                          className="delete-comment"
                          onClick={deleteComment}
                          aria-label="Delete"
                        >
                          Delete
                        </button>
                      );
                    }}
                  </Mutation>
                  <button
                    type="button"
                    className="cancel-delete"
                    onClick={() => setDeleteActive(!deleteActive)}
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            )}
            {editActive && (
              <CommentEdit
                commentId={comment.id}
                text={comment.text}
                handleEdit={handleEdit}
              />
            )}
            {replies.length < 1 && replyActive && (
              <CommentReply
                commentId={comment.id}
                handleReply={handleReply}
                handleSignUp={handleSignUp}
                handleLogin={handleLogin}
              />
            )}
            <div className="reply-container">
              {replies &&
                replies.map((reply, index) => (
                  <Reply
                    reply={reply}
                    userId={id}
                    commentId={comment.id}
                    handleSignUp={handleSignUp}
                    handleLogin={handleLogin}
                    handleReply={handleReply}
                    key={reply.id}
                    last={replies.length - 1}
                    index={index}
                  />
                ))}
            </div>
          </>
        );
      }}
    </Query>
  );
};

Comments.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string,
    replies: PropTypes.array,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

Reply.propTypes = {
  reply: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired
};

export default Comments;
