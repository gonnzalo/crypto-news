import express from "express";
import jwt from "jsonwebtoken";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import cors from "cors";
import axios from "axios";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";

require("dotenv").config();

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers["x-token"];
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.REACT_APP_SECRET
    };
  }
});

server.applyMiddleware({ app, path: "/graphql" });

sequelize.sync().then(async () => {
  fetchData();

  setInterval(() => {
    fetchData();
  }, 60 * 5000);

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
});

const fetchData = async () => {
  try {
    const result = await axios(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
    );

    const data = result.data.Data;

    data.forEach(link => {
      const date = new Date(link.published_on * 1000);
      models.Link.findOrCreate({
        where: { id: link.id },
        defaults: {
          id: link.id,
          title: link.title,
          body: link.body,
          source: link.source,
          url: link.url,
          imgUrl: link.imageurl,
          upVotes: link.upvotes,
          donwVotes: link.downvotes,
          createdAt: date.setSeconds(date.getSeconds())
        }
      }).then(([user, created]) => {
        if (created) {
          console.log("new link was created");
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
