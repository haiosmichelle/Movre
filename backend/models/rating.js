const { Sequelize, DataTypes } = require('sequelize');
const { sequelizePostgres } = require('../dataBase/database');

const Rating = sequelizePostgres.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Movies',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  star:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Rating;
