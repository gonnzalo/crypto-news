import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CurrentUser.css";

const CURRENT_USER = gql`
  query currentUser {
    me {
      id
      username
    }
  }
`;

const CurrentUser = () => {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div>
            <span className="current-user">
              <FontAwesomeIcon className="icon-user" icon={faUser} />
              {data.me.username}
            </span>
            <button
              type="button"
              className="btn-logout"
              onClick={() => {
                localStorage.removeItem("x-token");
                window.location.reload();
              }}
              aria-label="log out"
            >
              <FontAwesomeIcon className="icon-logout" icon={faSignInAlt} />
              Log out
            </button>
          </div>
        );
      }}
    </Query>
  );
};

export default CurrentUser;
