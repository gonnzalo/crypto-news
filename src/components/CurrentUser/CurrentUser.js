import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
      {({ client, loading, error, data: { me } }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        if (me)
          return (
            <span>
              <p>
                {me.username}
                &nbsp;
                <button
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
                  Log out
                </button>
              </p>
            </span>
          );
      }}
    </Query>
  );
};

export default CurrentUser;
