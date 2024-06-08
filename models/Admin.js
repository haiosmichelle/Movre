const { Sequelize, DataTypes } = require('sequelize');
const { sequelizePostgres } = require('../dataBase/database');

const Admin = sequelizePostgres.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = Admin;
