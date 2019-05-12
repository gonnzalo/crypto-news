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
    }
  });

  Link.associate = models => {
    Link.hasMany(models.Like, { onDelete: "CASCADE" });
    Link.hasMany(models.Comment, { onDelete: "CASCADE" });
  };

  return Link;
};
export default link;
