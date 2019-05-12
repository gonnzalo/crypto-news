import Sequelize from "sequelize";

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.REACT_APP_DATABASE,
  process.env.REACT_APP_DATABASE_USER,
  process.env.REACT_APP_DATABASE_PASSWORD,
  {
    dialect: "postgres"
  }
);

const models = {
  Link: sequelize.import("./link"),
  User: sequelize.import("./user"),
  Like: sequelize.import("./like"),
  Comment: sequelize.import("./comment")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
