"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const CreateDB = require("./models/watchList");
const path = require("path");
const {
  sequelizePostgres,
  sequelizeMySQL,
  sequelizeSQLite,
} = require("./dataBase/database");
const movieRoutes = require("./routes/Movie");
const userRoutes = require("./routes/User");
const reviewRoutes = require("./routes/Review");
const adminRoutes = require("./routes/Admin");
const User = require("./models/user");

const app = express();

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, ,Authorization");
  next();
});

app.use(bodyParser.json());

app.use(movieRoutes);
app.use(userRoutes);
app.use(reviewRoutes);
app.use(adminRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, ,Authorization");
  next();
});

app.use((error, _req, res, _next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

async function testDatabases() {
  try {
    await sequelizePostgres.authenticate();
    console.log("Conexiunea la PostgreSQL reușită.");
  } catch (error) {
    console.error("Conexiunea la PostgreSQL a eșuat:", error);
  }

  // try {
  //   await dbs.mysql.authenticate();
  //   console.log('Conexiunea la MySQL reușită.');
  // } catch (error) {
  //   console.error('Conexiunea la MySQL a eșuat:', error);
  // }
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// testDatabases();
//
//initializeDatabase();
app.listen(8080, () => console.log(`The server is running on port 8080`));
