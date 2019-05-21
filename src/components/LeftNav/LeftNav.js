import React, { useState } from "react";
import "./LeftNav.css";
import "./hamburger.css";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import CurrentUser from "../CurrentUser/CurrentUser";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const LeftNav = ({ handleSignUp }) => {
  const [isBurgerActive, setBurger] = useState(false);

  const handleCLik = () => {
    setBurger(!isBurgerActive);
  };

  return (
    <div className="left-header">
      <div className="left-nav-container">
        <div className="left-logo">
          <h1>NEWS</h1>
        </div>
        <nav
          className={`${
            isBurgerActive ? "left-navbar left-navbar-active" : "left-navbar"
          }`}
        >
          <ul className="left-nav-list">
            <Query query={IS_LOGGED_IN}>
              {({ data }) =>
                data.isLoggedIn ? (
                  <li>
                    <CurrentUser />
                  </li>
                ) : (
                  <>
                    <li>
                      <button type="button" className="left-btns-log">
                        Log in
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="left-btns-log"
                        onClick={handleSignUp}
                      >
                        Sign Up
                      </button>
                    </li>
                  </>
                )
              }
            </Query>
          </ul>
        </nav>
        <button
          className={`${
            isBurgerActive
              ? "is-active hamburger hamburger--elastic"
              : "hamburger hamburger--elastic"
          }`}
          type="button"
          onClick={handleCLik}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LeftNav;
