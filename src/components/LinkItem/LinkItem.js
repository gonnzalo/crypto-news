import React from "react";
import PropTypes from "prop-types";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import timeDifferenceForDate from "../utils";
import Likes from "../Likes/Likes";

import "./LinkItem.css";

const LinkItem = ({ feed, handleClick, handleSignUp }) => {
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
      <Likes
        upLikes={feed.upLikes}
        downLikes={feed.downLikes}
        linkId={feed.id}
        handleSignUp={handleSignUp}
      />
    </div>
  );
};

LinkItem.propTypes = {
  feed: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    source: PropTypes.string,
    url: PropTypes.string,
    upLikes: PropTypes.string,
    downLikes: PropTypes.string,
    createdAt: PropTypes.string,
    imgUrl: PropTypes.string
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default LinkItem;
