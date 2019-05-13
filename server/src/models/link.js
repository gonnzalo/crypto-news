const link = (sequelize, DataTypes) => {
  const Link = sequelize.define("link", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    body: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: { notEmpty: true }
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  });

  Link.associate = models => {
    Link.hasMany(models.Like, { onDelete: "CASCADE" });
    Link.hasMany(models.Comment, { onDelete: "CASCADE" });
  };

  return Link;
};
export default link;
