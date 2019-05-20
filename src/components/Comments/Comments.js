import React from "react";
import timeDifferenceForDate from "../utils";

import "./Comments.css";

const Comments = ({ comments }) => {
  const nestedReplies = replies => {
    return replies.map(reply => (
      <div key={reply.id} className="reply-container">
        <div className="comment-user">
          <span>{reply.user.username}</span>{" "}
          <span>{timeDifferenceForDate(reply.createdAt)}</span>
        </div>
        <div className="comment-text">
          <p>{reply.text}</p>
        </div>
      </div>
    ));
  };
  return comments.map(comment => (
    <div key={comment.id}>
      <div className="comment-user">
        <span>{comment.user.username}</span>{" "}
        <span>{timeDifferenceForDate(comment.createdAt)}</span>
      </div>
      <div className="comment-text">
        <p>{comment.text}</p>
        {comment.replies && nestedReplies(comment.replies)}
      </div>
    </div>
  ));
};

export default Comments;
