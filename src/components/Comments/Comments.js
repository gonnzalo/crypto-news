import React from "react";
import "./Comments.css";
import timeDifferenceForDate from "../utils";

const Comments = ({ comments }) => {
  return (
    <div className="comments-container">
      <form className="comemnt-create">
        <textarea name="" className="comment-textarea" />
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
};

export default Comments;
