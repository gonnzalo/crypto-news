import { ForbiddenError } from "apollo-server";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

export const isCommentOwner = async (parent, { id }, { models, me }) => {
  const comment = await models.Comment.findByPk(id, { raw: true });
  if (comment.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }
  return skip;
};
