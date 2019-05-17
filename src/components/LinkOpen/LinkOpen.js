import React from "react";
import {
  faThumbsUp,
  faThumbsDown,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comments from "../Comments/Comments";
import timeDifferenceForDate from "../utils";
import "./LinkOpen.css";

const LinkOpen = ({ feed }) => {
  return (
    <section className="link-open-container">
      {feed && (
        <>
          <div className="open-title-container">
            <h2 className="open-title">
              <a href={feed.url}>
                {feed.title}
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="icon-link"
                />
              </a>
              <span className="open-source">
                {timeDifferenceForDate(feed.createdAt)} by{" "}
                <a href={`https://${feed.source}.com`}>{feed.source}.com</a>
              </span>
            </h2>
          </div>
          <img src={feed.imgUrl} alt="news" className="open-image" />
          <p className="open-body">{feed.body}</p>
          <Comments comments={feed.comments} />
          <div />
        </>
      )}
    </section>
  );
};

export default LinkOpen;
