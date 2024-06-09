require('dotenv').config();

const { Sequelize } = require("sequelize");

// Conexiunea pentru PostgreSQL
const sequelizePostgres = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT
});

// Conexiunea pentru MySQL
const sequelizeMySQL = new Sequelize("mysqlDatabase", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// Conexiunea pentru SQLite
const sequelizeSQLite = new Sequelize({
  dialect: "sqlite",
  storage: "path/to/database.sqlite",
});

module.exports = {
  sequelizePostgres,
  sequelizeMySQL,
  sequelizeSQLite,
};
