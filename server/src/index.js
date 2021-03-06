import express from "express";
import jwt from "jsonwebtoken";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import cors from "cors";
import axios from "axios";
import http from "http";
import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";

const { Op } = require("sequelize");

require("dotenv").config();

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers.authorization;
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
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
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models
      };
    }
    if (req) {
      const me = await getMe(req);
      return {
        models,
        me,
        secret: process.env.SECRET
      };
    }
  }
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

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
          createdAt: date.setSeconds(date.getSeconds())
        }
      }).then(([user, created]) => {
        if (created) {
          // console.log("new link was created")
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// delete old news after 2 days...
const deleteOld = () => {
  models.Link.destroy({
    where: {
      createdAt: {
        [Op.lt]: new Date(new Date() - 48 * 60 * 60 * 1000)
      }
    }
  });
};

const isTest = !!process.env.TEST_DATABASE;

const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    // Create test link
    models.Link.create({
      id: 1,
      title: "tittle test",
      body: "body test",
      source: "source test",
      url: "url-test.com",
      imgUrl: "img-test.com"
    });
  }

  deleteOld();

  setInterval(() => {
    deleteOld();
  }, 48 * 60 * 60 * 1000);

  fetchData();

  setInterval(() => {
    fetchData();
  }, 60 * 2500);

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});
