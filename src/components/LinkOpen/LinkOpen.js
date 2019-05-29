import React from "react";
import PropTypes from "prop-types";
import { Html5Entities } from "html-entities";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentPage from "../CommentPage/CommentPage";
import timeDifferenceForDate from "../utils";
import "./LinkOpen.css";

const htmlEntities = new Html5Entities();

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
          <p className="open-body">{htmlEntities.decode(feed.body)}</p>
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

LinkOpen.propTypes = {
  feed: PropTypes.shape({ root: PropTypes.string.isRequired }),
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default LinkOpen;
