import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav/LeftNav";
import Footer from "./components/Footer/Footer";
import LinkList from "./components/LinkList/LinkList";
import LinkOpen from "./components/LinkOpen/LinkOpen";
import SignUp from "./components/SignUp/SignUp";
import "./App.css";
import CurrentUser from "./components/CurrentUser/CurrentUser";

const App = () => {
  const [feed, setFeed] = useState(null);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);

  const handleClick = feed => {
    setFeed(feed);
  };

  const handleSignUp = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  return (
    <>
      <Header />
      <LeftNav handleSignUp={handleSignUp} />
      <div className="app-container">
        <LinkList handleClick={handleClick} />
        <LinkOpen feed={feed} />
      </div>
      {isSignUpActive && <SignUp handleSignUp={handleSignUp} />}
      <Footer />
    </>
  );
};

export default App;
