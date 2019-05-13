import uuidv4 from "uuid/v4";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isCommentOwner } from "./authorization";
import pubsub, { EVENTS } from "../subscription";

export default {
  Query: {
    links: async (message, args, { models }) => {
      return models.Link.findAll();
    },
    link: async (parent, { id }, { models }) => {
      return models.Link.findByPk(id);
    }
  },

  Link: {
    comments: async (link, args, { models }) => {
      return models.Comment.findAll({
        where: {
          linkId: link.id
        }
      });
    }
  },

  Mutation: {
    likeLink: combineResolvers(
      isAuthenticated,
      async (parent, { linkId, isPositive }, { models, me }) => {
        const like = models.Like.findOrCreate({
          where: { linkId, userId: me.id },
          defaults: {
            linkId,
            userId: me.id,
            isPositive
          }
        }).then(([result, created]) => {
          if (!created) {
            result.update({
              linkId,
              userId: me.id,
              isPositive
            });
          }
          return result;
        });
        pubsub.publish(EVENTS.LIKE.CREATED, {
          likeCreated: { like }
        });
        return like;
      }
    ),

    createComment: combineResolvers(
      isAuthenticated,
      async (parent, { text, linkId }, { models, me }) => {
        const comment = await models.Comment.create({
          text,
          userId: me.id,
          linkId
        });
        pubsub.publish(EVENTS.COMMENT.CREATED, {
          commentCreated: { comment }
        });
        return comment;
      }
    ),
    deleteComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id }, { models }) => {
        return models.Comment.destroy({ where: { id } });
      }
    )
  },

  Comment: {
    user: async (comment, args, { models }) => {
      return models.User.findByPk(comment.userId);
    }
  },

  Like: {
    user: async (like, args, { models }) => {
      return models.User.findByPk(like.userId);
    },
    link: async (like, args, { models }) => {
      return models.Link.findByPk(like.linkId);
    }
  },

  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.CREATED)
    },
    likeCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.LIKE.CREATED)
    }
  }
};
