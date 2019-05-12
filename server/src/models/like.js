const like = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
    liked: {
      type: DataTypes.BOOLEAN
    }
  });

  Like.associate = models => {
    Like.belongsTo(models.Link, { onDelete: "CASCADE" });
    Like.belongsTo(models.User, { onDelete: "CASCADE" });
  };

  return Like;
};

export default like;
