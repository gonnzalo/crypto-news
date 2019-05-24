import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ReactComponent as Rocket } from "./rocket.svg";
import CurrentUser from "../CurrentUser/CurrentUser";

import "./Header.css";
import "./hamburger.css";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const Header = ({ handleSignUp, handleLogin }) => {
  const [isBurgerActive, setBurger] = useState(false);

  const handleCLik = () => {
    setBurger(!isBurgerActive);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo">
          <Rocket className="App-logo" />
          <h1>Crypto News</h1>
        </div>
        <nav
          className={`${isBurgerActive ? "navbar navbar-active" : "navbar"}`}
        >
          <ul className="nav-list">
            <Query query={IS_LOGGED_IN}>
              {({ data }) =>
                data.isLoggedIn ? (
                  <li>
                    <CurrentUser />
                  </li>
                ) : (
                  <>
                    <li>
                      <button
                        type="button"
                        className="btn-login"
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn-signup"
                        onClick={handleSignUp}
                      >
                        New Account
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
    </header>
  );
};

export default Header;
