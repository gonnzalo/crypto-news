import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LinkItem from "../LinkItem/LinkItem";

import "./LinkList.css";

const GET_LINKS = gql`
  query links {
    links {
      title
      body
      id
      source
      url
      createdAt
    }
  }
`;

const LinkList = ({ handleClick }) => (
  <Query query={GET_LINKS} pollInterval={5000}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      const { links } = data;

      return (
        <section className="link-list-container">
          {links.map(link => (
            <LinkItem key={link.id} feed={link} handleClick={handleClick} />
          ))}
        </section>
      );
    }}
  </Query>
);

export default LinkList;
