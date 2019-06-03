import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, secret);
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return models.User.findByPk(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return models.User.findByPk(me.id);
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      await models.User.findOne({ where: { username } }).then(user => {
        if (user) {
          throw new UserInputError("Username already in use");
        }
      });

      await models.User.findOne({ where: { email } }).then(user => {
        if (user) {
          throw new UserInputError("Email already in use");
        }
      });

      if (password.length < 7) {
        throw new AuthenticationError("password to short");
      }

      const user = await models.User.create({
        username,
        email,
        password
      });

      return { token: createToken(user, secret) };
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret) };
    }
  },

  User: {
    comments: async (user, args, { models }) => {
      return models.Comment.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
