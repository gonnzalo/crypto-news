import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Header from "./components/Header/Header";

import Footer from "./components/Footer/Footer";
import LinkList from "./components/LinkList/LinkList";
import LinkOpen from "./components/LinkOpen/LinkOpen";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import "./App.css";

import UserContext from "./UserContext";

const isLoggedIn = !!localStorage.getItem("x-token");

const App = () => {
  const [linkOpen, setLinkOpen] = useState(null);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const mediaQueryMedium = useMediaQuery("(max-width:1200px)");

  const handleClick = link => {
    setLinkOpen(link);
    if (mediaQueryMedium) {
      setIsLinkOpen(!isLinkOpen);
    }
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
    <UserContext.Provider value={isLoggedIn}>
      <div className="main-app">
        <Header
          handleSignUp={handleSignUp}
          handleLogin={handleLogin}
          closeLogin={closeLogin}
        />
        <div className="app-container">
          <LinkList handleClick={handleClick} handleSignUp={handleSignUp} />
          <LinkOpen
            feed={linkOpen}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
            isLinkOpen={isLinkOpen}
            handleClick={handleClick}
          />
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
    </UserContext.Provider>
  );
};

export default App;
