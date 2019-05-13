const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: DataTypes.STRING(2000),
      validate: { notEmpty: true }
    }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.Link, { onDelete: "CASCADE" });
    Comment.belongsTo(models.User, { onDelete: "CASCADE" });
  };

  return Comment;
};
export default comment;
