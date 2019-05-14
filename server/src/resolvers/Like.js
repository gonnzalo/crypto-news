import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isCommentOwner } from "./authorization";
import pubsub, { EVENTS } from "../subscription";

export default {
  Like: {
    user: async (like, args, { models }) => {
      return models.User.findByPk(like.userId);
    },
    link: async (like, args, { models }) => {
      return models.Link.findByPk(like.linkId);
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
    )
  },

  Subscription: {
    likeCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.LIKE.CREATED)
    }
  }
};
