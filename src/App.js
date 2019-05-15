import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

// const GET_LINKS = gql`
//   {
//     links {
//       title
//       id
//     }
//   }
// `;

// <Query query={GET_LINKS}>
//       {({ loading, error, data }) => {
//         if (loading) return "Loading...";
//         if (error) return `Error! ${error.message}`;

//         return (
//           <div>
//             {data.links.map(link => (
//               <div key={link.id}>
//                 <h5>{link.title}</h5>
//               </div>
//             ))}
//           </div>
//         );
//       }}
//     </Query>

const App = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <section className="news-timeline">timeline</section>
        <section className="news-open">open</section>
      </div>
      <Footer />
    </>
  );
};

export default App;
