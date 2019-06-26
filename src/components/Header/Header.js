import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ReactComponent as Rocket } from "./rocket.svg";
import CurrentUser from "../CurrentUser/CurrentUser";
import UserContext from "../../UserContext";
import "./Header.css";
import "./hamburger.css";

const Header = ({ handleSignUp, handleLogin, closeLogin }) => {
  const isLoggedIn = useContext(UserContext);
  const [isBurgerActive, setBurger] = useState(false);
  const mediaQueryBurger = useMediaQuery("(max-width:750px)");

  const handleCLik = () => {
    setBurger(!isBurgerActive);
    closeLogin();
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo">
          <Rocket className="App-logo" />
          <h1>Crypto News</h1>
          {mediaQueryBurger && (
            <button
              className={`${
                isBurgerActive
                  ? "is-active hamburger hamburger--elastic"
                  : "hamburger hamburger--elastic"
              }`}
              type="button"
              onClick={handleCLik}
              aria-label="open menu"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          )}
        </div>

        <nav
          className={`${isBurgerActive ? "navbar navbar-active" : "navbar"}`}
        >
          <ul className="navbar nav-list navbar-active">
            {isLoggedIn ? (
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
                    aria-label="sign in"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-signup"
                    onClick={handleSignUp}
                    aria-label="sign up new user"
                  >
                    New Account
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired
};

export default Header;
