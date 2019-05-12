import uuidv4 from "uuid/v4";

export default {
  Query: {
    links: async (message, args, { models }) => {
      return models.Link.findAll();
    }
  },

  Mutation: {
    like: async (parent, { linkId }, { models, me }) => {
      if (!me) {
        return null;
      }

      const userId = models.User.findByPk(me.id);

      // 2
      const linkExists = await models.Like.findOne();

      if (linkExists) {
        throw new Error(`Already voted for link: ${linkId}`);
      }

      // 3
      return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } }
      });
    },

    createComment: async (parent, { text }, { me, models }) => {
      return models.Comment.create({
        text,
        userId: me.id
      });
    },
    deleteComment: async (parent, { id }, { models }) => {
      return models.Comment.destroy({ where: { id } });
    }
  },

  Link: {
    comments: async (user, args, { models }) => {
      return models.Comment.findAll({
        where: {
          userId: user.id
        }
      });
    }
  },
  Comment: {
    userId: async (comment, args, { models }) => {
      return models.User.findById(message.userId);
    }
  }
};
