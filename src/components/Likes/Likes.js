import React, { useContext } from "react";
import PropTypes from "prop-types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Likes.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import UserContext from "../../UserContext";

const ADD_LIKE = gql`
  mutation($linkId: ID!, $isPositive: Boolean!) {
    likeLink(linkId: $linkId, isPositive: $isPositive) {
      isPositive
      link {
        id
        upLikes
        downLikes
      }
    }
  }
`;

const Likes = ({ upLikes, downLikes, linkId, handleSignUp }) => {
  const isLoggedIn = useContext(UserContext);
  return (
    <Mutation mutation={ADD_LIKE}>
      {addLike => {
        return (
          <div className="feed-likes">
            <span>{upLikes}</span>
            <button
              type="button"
              className="btn-like btn-like-up"
              onClick={() => {
                if (isLoggedIn === false) {
                  return handleSignUp();
                }
                return addLike({ variables: { linkId, isPositive: true } });
              }}
              aria-label="like"
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={`icon-thumb thumb-green ${upLikes > 0 &&
                  "icon-green"}`}
              />
            </button>

            <span>{downLikes}</span>
            <button
              type="button"
              className="btn-like btn-like-down"
              onClick={() => {
                if (isLoggedIn === false) {
                  return handleSignUp();
                }
                return addLike({ variables: { linkId, isPositive: false } });
              }}
              aria-label="deslike"
            >
              <FontAwesomeIcon
                icon={faThumbsDown}
                className={`icon-thumb thumb-red ${downLikes > 0 &&
                  "icon-red"}`}
              />
            </button>
          </div>
        );
      }}
    </Mutation>
  );
};

Likes.propTypes = {
  upLikes: PropTypes.string.isRequired,
  downLikes: PropTypes.string.isRequired,
  linkId: PropTypes.string.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default Likes;
