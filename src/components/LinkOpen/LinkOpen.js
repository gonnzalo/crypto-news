import React, { useState } from "react";
import PropTypes from "prop-types";
import { Html5Entities } from "html-entities";
import {
  faExternalLinkAlt,
  faAngleLeft,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CommentPage from "../CommentPage/CommentPage";
import timeDifferenceForDate from "../utils";

import "./LinkOpen.css";

const htmlEntities = new Html5Entities();

const LinkOpen = ({
  feed,
  handleSignUp,
  handleLogin,
  isLinkOpen,
  handleClick
}) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const mediaQueryMedium = useMediaQuery("(max-width:1200px)");

  const updateCommentsCount = (countComment, countReplies) => {
    setCommentsCount(countComment + countReplies);
  };

  return (
    <section
      className={`link-open-container  ${
        mediaQueryMedium ? "link-open-hide" : ""
      } ${isLinkOpen ? "link-open-show" : ""}`}
    >
      {mediaQueryMedium && (
        <div className="btn-back-container">
          <button
            type="button"
            onClick={() => handleClick(null)}
            className="btn-back"
            aria-label="back"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="icon-btn-back" />
            BACK
          </button>
          <button
            type="button"
            onClick={() => handleClick(null)}
            className="btn-back"
            aria-label="home"
          >
            HOME
          </button>
        </div>
      )}

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
          <p className="open-body">{htmlEntities.decode(feed.body)}</p>
          <div className="Comments-icon-container">
            <FontAwesomeIcon icon={faComment} />
            <span className="comments-count"> {commentsCount} comments</span>
          </div>
          <CommentPage
            linkId={feed.id}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
            updateCommentsCount={updateCommentsCount}
          />
          <div />
        </>
      )}
    </section>
  );
};

LinkOpen.propTypes = {
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
  }),
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  isLinkOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
LinkOpen.defaultProps = { feed: null };

export default LinkOpen;
