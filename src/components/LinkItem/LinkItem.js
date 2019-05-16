import React from "react";
import {
  faThumbsUp,
  faThumbsDown,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import timeDifferenceForDate from "../utils";

import "./LinkItem.css";

const LinkItem = ({ feed, handleClick }) => {
  return (
    <div
      className="feed-container"
      onClick={() => handleClick(feed)}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <span className="feed-time">{timeDifferenceForDate(feed.createdAt)}</span>
      <span className="feed-title">
        {feed.title}
        <a href={feed.url} className="feed-url">
          <FontAwesomeIcon icon={faLink} className="icon-link" />
          <span>{feed.source}</span>
        </a>
      </span>
      <div className="feed-likes">
        <span>0</span>
        <FontAwesomeIcon icon={faThumbsUp} className="icon-thumb" />
        <span>1</span>
        <FontAwesomeIcon icon={faThumbsDown} className="icon-thumb" />
      </div>
    </div>
  );
};

export default LinkItem;
