const { sequelizePostgres } = require('./dataBase/database');
const fs = require('fs');
const path = require('path');

// Citește toate fișierele din directorul models și le importă
const modelsDir = path.join(__dirname, 'models');
fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js')) {
    require(path.join(modelsDir, file));
  }
});
// Sincronizează toate modelele
sequelizePostgres.sync({ force: true })
  .then(() => {
    console.log('Tabelele au fost create cu succes.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Eroare la crearea tabelelor: ', err);
    process.exit(1);
  });
