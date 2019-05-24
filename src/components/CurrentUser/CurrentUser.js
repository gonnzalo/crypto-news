import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  faSignInAlt,
  faUser,
  faUserNinja
} from "@fortawesome/free-solid-svg-icons";
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
      {({ client, loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        if (data.me)
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
                  client.writeData({
                    data: {
                      isLoggedIn: false
                    }
                  });
                  client.clearStore();
                }}
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
