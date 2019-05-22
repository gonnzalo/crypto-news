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
      {({ client, loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        if (data.me)
          return (
            <span>
              <p>
                {data.me.username}
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
        localStorage.removeItem("x-token");
        client.writeData({
          data: {
            isLoggedIn: false
          }
        });
        client.clearStore();
      }}
    </Query>
  );
};

export default CurrentUser;
