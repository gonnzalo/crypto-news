import React, { useState } from "react";
import auth from "../Auth/Auth";

import "./Header.css";
import "./hamburger.css";

const Header = () => {
  const [isBurgerActive, setBurger] = useState(false);

  const handleCLik = () => {
    setBurger(!isBurgerActive);
  };

  logout = () => {
    auth.logout();
    this.props.history.replace("/");
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo">
          <h1>NEWS</h1>
        </div>
        <nav
          className={`${isBurgerActive ? "navbar navbar-active" : "navbar"}`}
        >
          <ul className="nav-list">
            <li>
              <button type="button" className="btns-log">
                {auth.isAuthenticated() ? (
                  <button className="btns-log" onClick={() => logout()}>
                    Log out{" "}
                  </button>
                ) : (
                  <button className="btns-log" onClick={() => auth.login()}>
                    Log In
                  </button>
                )}
              </button>
            </li>
            <li>
              <button type="button" className="btns-log">
                Sign Up
              </button>
            </li>
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
