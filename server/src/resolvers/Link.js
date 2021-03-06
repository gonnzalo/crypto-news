export default {
  Query: {
    links: async (message, { offset, limit = 20 }, { models }) => {
      return models.Link.findAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]]
      });
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
    },
    upLikes: async (link, args, { models }) => {
      return models.Like.findAndCountAll({
        where: {
          linkId: link.id,
          isPositive: true
        }
      }).then(result => {
        return result.count;
      });
    },
    downLikes: async (link, args, { models }) => {
      return models.Like.findAndCountAll({
        where: {
          linkId: link.id,
          isPositive: false
        }
      }).then(result => {
        return result.count;
      });
    }
  }
};
