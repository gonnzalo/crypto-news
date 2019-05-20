import React, { useState, useEffect } from "react";
import "./CommentPage.css";

import CommentCreate from "../CommentCreate/CommentCreate";
import Comments from "../Comments/Comments";

const CommentPage = ({ comments, linkId }) => {
  return (
    <>
      <CommentCreate linkId={linkId} />
      <Comments comments={comments} />
    </>
  );
};

export default CommentPage;
