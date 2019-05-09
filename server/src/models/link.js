const link = (sequelize, DataTypes) => {
  const Link = sequelize.define("link", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.STRING(2000)
    },
    source: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    upVotes: {
      type: DataTypes.INTEGER
    },
    donwVotes: {
      type: DataTypes.INTEGER
    }
  });
  // Link.associate = models => {
  //   Link.hasMany(models.Link, { onDelete: "CASCADE" });
  // };
  return Link;
};
export default link;
