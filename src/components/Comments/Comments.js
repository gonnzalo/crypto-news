import React, { useState } from "react";
import timeDifferenceForDate from "../utils";

import CommentReply from "../CommentReply/CommentReply";

import "./Comments.css";

const Comments = ({ comment, handleSignUp, handleLogin }) => {
  const [replyActive, setReplyActive] = useState(false);

  const { replies } = comment;

  // close reply after submit
  const handleReply = () => {
    return setReplyActive(false);
  };

  const nestedReplies = values => {
    const last = values.length - 1;
    return values.map((reply, index) => (
      <div key={reply.id}>
        <div className="comment-header">
          <span className="comment-user">{reply.user.username}</span>{" "}
          <span className="time-ago">
            {timeDifferenceForDate(reply.createdAt)} ago
          </span>
        </div>
        <div className="comment-text">
          <p>{reply.text}</p>
        </div>
        {last === index && (
          <button
            type="button"
            className="button-reply"
            onClick={() => setReplyActive(!replyActive)}
          >
            Reply{" "}
          </button>
        )}
        {last === index && replyActive && (
          <CommentReply
            commentId={comment.id}
            handleReply={handleReply}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
          />
        )}
      </div>
    ));
  };

  return (
    <div key={comment.id}>
      <div className="comment-header">
        <span className="comment-user">{comment.user.username}</span>
        <span className="time-ago">
          {timeDifferenceForDate(comment.createdAt)} ago
        </span>
      </div>
      <div className="comment-text">
        <p>{comment.text}</p>
      </div>
      <div className="comment-footer">
        {replies.length < 1 && (
          <button
            type="button"
            className="button-reply"
            onClick={() => setReplyActive(!replyActive)}
          >
            Reply{" "}
          </button>
        )}
      </div>
      {replies.length < 1 && replyActive && (
        <CommentReply
          commentId={comment.id}
          handleReply={handleReply}
          handleSignUp={handleSignUp}
          handleLogin={handleLogin}
        />
      )}
      <div className="reply-container">
        {comment.replies && nestedReplies(comment.replies)}
      </div>
    </div>
  );
};

export default Comments;
