import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isCommentOwner } from "./authorization";
import pubsub, { EVENTS } from "../subscription";

export default {
  Query: {
    comments: async (parent, { linkId }, { models }) => {
      return models.Comment.findAll({
        where: {
          linkId
        },
        order: [["createdAt", "DESC"]]
      });
    }
  },
  Mutation: {
    createComment: combineResolvers(
      isAuthenticated,
      async (parent, { text, linkId, commentId, isReply }, { models, me }) => {
        const comment = await models.Comment.create({
          text,
          userId: me.id,
          linkId,
          commentId,
          isReply
        });
        if (isReply) {
          const reply = await models.Comment.findByPk(commentId);
          pubsub.publish(EVENTS.COMMENT.CREATED, {
            commentCreated: reply
          });
        } else {
          pubsub.publish(EVENTS.COMMENT.CREATED, {
            commentCreated: comment
          });
        }
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
          commentEdited: comment
        });
        return comment;
      }
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id }, { models }) => {
        let comment = await models.Comment.update(
          { text: "-- Comment Delete --" },
          { where: { id }, returning: true, plain: true }
        );
        [, comment] = comment;

        pubsub.publish(EVENTS.COMMENT.EDITED, {
          commentEdited: comment
        });
        return comment;
      }
    )
  },

  Comment: {
    user: async (comment, args, { models }) => {
      return models.User.findByPk(comment.userId);
    },
    replies: async (comment, args, { models }) => {
      return models.Comment.findAll({
        where: {
          commentId: comment.id
        }
      });
    }
  },

  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.CREATED)
    },
    commentEdited: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.EDITED)
    }
  }
};
