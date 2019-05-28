import React, { useState, useEffect } from "react";
import axios from "axios";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

const Footer = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();

    const interval = setInterval(() => fetchData(), 60 * 5000);

    return function cleanup() {
      clearInterval(interval);
      fetchData();
    };
  }, []);

  return (
    <footer>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div />
      ) : (
        <div className="footer-container">
          {data.map(item => (
            <div key={item.symbol} className="top-item-container">
              <div className="symbol-change">
                <span className="footer-symbol">
                  {item.symbol.toUpperCase()}
                </span>

                {item.price_change_percentage_24h === 0 && (
                  <span className="footer-change">
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </span>
                )}
                {item.price_change_percentage_24h > 0 ? (
                  <div className="footer-change green-price">
                    <FontAwesomeIcon icon={faSortUp} className="icon-footer" />
                    <span> {item.price_change_percentage_24h.toFixed(2)}%</span>
                  </div>
                ) : (
                  <div className="footer-change red-price">
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className="icon-footer"
                    />
                    <span> {item.price_change_percentage_24h.toFixed(2)}%</span>
                  </div>
                )}
              </div>
              <div className="footer-current">
                <span>${item.current_price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </footer>
  );
};

export default Footer;
