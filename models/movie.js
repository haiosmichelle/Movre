const { Sequelize, DataTypes } = require('sequelize');
const { sequelizePostgres } = require('../dataBase/database');

const Movie = sequelizePostgres.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  runtime: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raiting:{
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Movie;
