import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkList from "./components/LinkList/LinkList";
import LinkOpen from "./components/LinkOpen/LinkOpen";
import Login from "./components/Login/Login";
import "./App.css";

const App = () => {
  const [feed, setFeed] = useState(null);

  const handleClick = feed => {
    setFeed(feed);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <LinkList handleClick={handleClick} />
        <LinkOpen feed={feed} />
      </div>
      <Login />
      <Footer />
    </>
  );
};

export default App;
