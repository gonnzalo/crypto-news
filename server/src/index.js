import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import axios from "axios";

import schema from "./schema";

const app = express();

const fetchData = async () => {
  try {
    const result = await axios(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
    );

    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema
  //   resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
