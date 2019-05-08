import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";

// https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=c0133cd696ef40fb95aa5ef386c62da0   for top heading.

function App() {
  const [feed, setFeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          "https://newsapi.org/v2/everything?q=bitcoin&from=2019-05-08&sortBy=publishedAt&apiKey=c0133cd696ef40fb95aa5ef386c62da0"
        );
        setFeed(result.data.articles);
        console.log(result.data.articles[0].content);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {feed && feed[0].description}
      <Footer />
    </div>
  );
}

export default App;
