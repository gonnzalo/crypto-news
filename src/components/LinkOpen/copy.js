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

const renderHTML = rawHTML =>
  React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

const LinkOpen = ({ feed, handleSignUp, handleLogin }) => {
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
          {/* <div className="open-image">
            <img src={feed.imgUrl} alt="news" />
          </div> */}
          <div className="open-body">{renderHTML(feed.body)}</div>
          <CommentPage
            linkId={feed.id}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
          />
          <div />
        </>
      )}
    </section>
  );
};

export default LinkOpen;
