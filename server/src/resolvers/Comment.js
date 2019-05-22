import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isCommentOwner } from "./authorization";
import pubsub, { EVENTS } from "../subscription";

export default {
  Query: {
    comments: async (parent, { linkId }, { models }) => {
      return models.Comment.findAll({
        where: {
          linkId
        }
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
    // replyComment: combineResolvers(
    //   isAuthenticated,
    //   async (parent, { text, commentId, linkId }, { models, me }) => {
    //     const reply = await models.Comment.create({
    //       text,
    //       userId: me.id,
    //       commentId,
    //       linkId
    //     });

    //     console.log(comment);
    //     pubsub.publish(EVENTS.COMMENT.REPLAY, {
    //       commentCreated: reply
    //     });
    //     return reply;
    //   }
    // ),

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
        const comment = await models.Comment.findByPk(id);
        const deleted = await models.Comment.destroy({ where: { id } });
        if (deleted) {
          pubsub.publish(EVENTS.COMMENT.DELETED, {
            commentDeleted: comment
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
    commentReplied: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.REPLIED)
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
