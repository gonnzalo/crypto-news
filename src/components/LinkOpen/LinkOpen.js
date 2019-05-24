import React from "react";

import {
  faThumbsUp,
  faThumbsDown,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentPage from "../CommentPage/CommentPage";
import timeDifferenceForDate from "../utils";
import "./LinkOpen.css";

const LinkOpen = ({ feed }) => {
  return (
    <section className="link-open-container">
      {feed && (
        <>
          <div className="open-title-container">
            <a className="open-title-link" href={feed.url}>
              <h2 className="open-title"> {feed.title} </h2>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="icon-link" />
            </a>
          </div>
          <div className="open-source-container">
            {" "}
            <span className="open-source">
              {timeDifferenceForDate(feed.createdAt)} by{" "}
              <a className="source-link" href={`https://${feed.source}.com`}>
                {feed.source}.com
              </a>
            </span>
          </div>
          <img src={feed.imgUrl} alt="news" className="open-image" />
          <p className="open-body">{feed.body}</p>
          <CommentPage linkId={feed.id} />
          <div />
        </>
      )}
    </section>
  );
};

export default LinkOpen;
