import React from "react";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Likes.css";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

const Likes = ({ upLikes, downLikes, linkId }) => {
  return (
    <Mutation mutation={ADD_LIKE}>
      {(addLike, { loading, error, data }) => {
        return (
          <div className="feed-likes">
            <span>{upLikes}</span>
            <button
              className="btn-like btn-like-up"
              onClick={() => {
                addLike({ variables: { linkId, isPositive: true } });
              }}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={`icon-thumb ${upLikes > 0 && "icon-green"}`}
              />
            </button>

            <span>{downLikes}</span>
            <button
              className="btn-like btn-like-down"
              onClick={() => {
                addLike({ variables: { linkId, isPositive: false } });
              }}
            >
              <FontAwesomeIcon
                icon={faThumbsDown}
                className={`icon-thumb ${downLikes > 0 && "icon-red"}`}
              />
            </button>
          </div>
        );
      }}
    </Mutation>
  );
};

export default Likes;
