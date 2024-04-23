const { Sequelize } = require("sequelize");

// Conexiunea pentru PostgreSQL
const sequelizePostgres = new Sequelize("movre", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
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
