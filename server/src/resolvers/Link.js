export default {
  Query: {
    links: async (message, args, { models }) => {
      return models.Link.findAll();
    }
  }
};
