const { Sequelize, DataTypes } = require("sequelize");
const { sequelizePostgres } = require("../dataBase/database");

const watchList = sequelizePostgres.define("watchList", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  MovieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Movies",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

module.exports = watchList;
