import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isCommentOwner } from "./authorization";
import pubsub, { EVENTS } from "../subscription";

export default {
  Mutation: {
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

    editComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id, text }, { models }) => {
        let comment = await models.Comment.update(
          { text },
          { where: { id }, returning: true, plain: true }
        );
        [, comment] = comment;

        pubsub.publish(EVENTS.COMMENT.EDITED, {
          commentEdited: { comment }
        });
        return comment;
      }
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id }, { models }) => {
        const comment = await models.Comment.findByPk(id);
        const deleted = await models.Comment.destroy({ where: { id } });
        if (deleted) {
          pubsub.publish(EVENTS.COMMENT.DELETED, {
            commentDeleted: { comment }
          });
          return deleted;
        }
        return deleted;
      }
    )
  },

  Comment: {
    user: async (comment, args, { models }) => {
      return models.User.findByPk(comment.userId);
    }
  },

  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.CREATED)
    },
    commentEdited: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.EDITED)
    },
    commentDeleted: {
      subscribe: () => {
        return pubsub.asyncIterator(EVENTS.COMMENT.DELETED);
      }
    }
  }
};
