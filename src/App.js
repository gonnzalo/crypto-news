import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav/LeftNav";
import Footer from "./components/Footer/Footer";
import LinkList from "./components/LinkList/LinkList";
import LinkOpen from "./components/LinkOpen/LinkOpen";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import { UserContext } from "./user-context";
import "./App.css";
import CurrentUser from "./components/CurrentUser/CurrentUser";

const App = () => {
  const [linkOpen, setLinkOpen] = useState(null);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);

  const handleClick = link => {
    setLinkOpen(link);
  };

  const handleSignUp = () => {
    setIsSignUpActive(!isSignUpActive);
    setIsLoginActive(false);
  };

  const handleLogin = () => {
    setIsLoginActive(!isLoginActive);
    setIsSignUpActive(false);
  };

  const closeLogin = () => {
    setIsLoginActive(false);
    setIsSignUpActive(false);
  };

  return (
    <div className="main-app">
      <Header handleSignUp={handleSignUp} handleLogin={handleLogin} />
      <div className="app-container">
        <LinkList handleClick={handleClick} />
        <LinkOpen feed={linkOpen} />
      </div>
      {isSignUpActive && (
        <SignUp
          handleSignUp={handleSignUp}
          closeLogin={closeLogin}
          handleLogin={handleLogin}
        />
      )}
      {isLoginActive && (
        <Login
          handleLogin={handleLogin}
          closeLogin={closeLogin}
          handleSignUp={handleSignUp}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
