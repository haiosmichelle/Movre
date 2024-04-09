'use strict';
const { sequelizePostgres, sequelizeMySQL, sequelizeSQLite } = require('./dataBase/database');
const User = require('./models/user');

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

async function testDatabases() {
    try {
      await sequelizePostgres.authenticate();
      console.log('Conexiunea la PostgreSQL reușită.');
    } catch (error) {
      console.error('Conexiunea la PostgreSQL a eșuat:', error);
    }
  
    // try {
    //   await dbs.mysql.authenticate();
    //   console.log('Conexiunea la MySQL reușită.');
    // } catch (error) {
    //   console.error('Conexiunea la MySQL a eșuat:', error);
    // }
  
  }
  async function initializeDatabase() {
    try {
      await User.sync({ force: true }); 
      console.log('Tabelul "Users" a fost creat cu succes.');
    } catch (error) {
      console.error('Eroare la crearea tabelului "Users":', error);
    }
  }
  

  testDatabases();
//   initializeDatabase();