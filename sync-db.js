const { sequelizePostgres } = require('./dataBase/database');
const models = require('./models');

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
