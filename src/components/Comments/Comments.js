import React, { useState, useEffect } from "react";
import timeDifferenceForDate from "../utils";

import CommentReply from "../CommentReply/CommentReply";

import "./Comments.css";

const Comments = ({ comment }) => {
  const [replyActive, setReplyActive] = useState(false);

  const { replies } = comment;

  // close reply after submit
  const handleReply = () => {
    return setReplyActive(false);
  };

  const nestedReplies = replies => {
    const last = replies.length - 1;
    return replies.map((reply, index) => (
      <div key={reply.id}>
        <div className="comment-user">
          <span>{reply.user.username}</span>{" "}
          <span>{timeDifferenceForDate(reply.createdAt)}</span>
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
          <CommentReply commentId={comment.id} handleReply={handleReply} />
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
        <CommentReply commentId={comment.id} handleReply={handleReply} />
      )}
      <div className="reply-container">
        {comment.replies && nestedReplies(comment.replies)}
      </div>
    </div>
  );
};

export default Comments;
