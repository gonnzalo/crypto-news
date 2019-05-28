import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Rocket } from "./rocket.svg";
import CurrentUser from "../CurrentUser/CurrentUser";
import UserContext from "../../UserContext";
import "./Header.css";
import "./hamburger.css";

const Header = ({ handleSignUp, handleLogin, closeLogin }) => {
  const isLoggedIn = useContext(UserContext);
  const [isBurgerActive, setBurger] = useState(false);

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
            )}
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

Header.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired
};

export default Header;
