const fs = require('fs');
const path = require('path');
const { sequelizePostgres } = require('../dataBase/database');

const models = {};

// Citește toate fișierele din directorul models și le importă
const modelsDir = path.join(__dirname);
fs.readdirSync(modelsDir).forEach(file => {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const model = require(path.join(modelsDir, file));
    models[model.name] = model;
  }
});

// Definirea relațiilor între modele (dacă există)
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize: sequelizePostgres,
  Sequelize: require('sequelize'),
  ...models
};
