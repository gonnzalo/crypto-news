import React, { useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import InfiniteScroll from "react-infinite-scroll-component";
import LinkItem from "../LinkItem/LinkItem";
import LoadingProgress from "../LoadingProgress";

import "./LinkList.css";

const GET_LINKS = gql`
  query links($offset: Int) {
    links(offset: $offset) {
      title
      body
      id
      source
      url
      imgUrl
      createdAt
      upLikes
      downLikes
    }
  }
`;

const LinkList = ({ handleClick, handleSignUp }) => {
  const [hasMore, setHasMore] = useState(true);

  return (
    <Query
      query={GET_LINKS}
      variables={{
        offset: 0
      }}
      pollInterval={60 * 2000}
    >
      {({ loading, error, data, fetchMore, startPolling, stopPolling }) => {
        if (loading) return <LoadingProgress />;
        if (error) return `Error! ${error.message}`;
        const { links } = data;

        return (
          <section className="link-list-container" id="scrollableDiv">
            <InfiniteScroll
              dataLength={links.length}
              next={() => {
                fetchMore({
                  variables: {
                    offset: data.links.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (fetchMoreResult.links.length === 0) {
                      setHasMore(false);
                      return prev;
                    }
                    return Object.assign({}, prev, {
                      links: [...prev.links, ...fetchMoreResult.links]
                    });
                  }
                });
              }}
              hasMore={hasMore}
              loader={
                <h3>
                  <LoadingProgress />
                </h3>
              }
              scrollableTarget="scrollableDiv"
              scrollThreshold="100px"
              className="fix-infinite"
            >
              {links.map(link => (
                <LinkItem
                  key={link.id}
                  feed={link}
                  handleClick={handleClick}
                  handleSignUp={handleSignUp}
                />
              ))}
            </InfiniteScroll>
          </section>
        );
      }}
    </Query>
  );
};

LinkList.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default LinkList;
