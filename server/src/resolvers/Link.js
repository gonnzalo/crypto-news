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
  }
};
