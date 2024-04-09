const bcrypt = require('bcrypt');

// Funcția pentru generarea hash-ului pentru parolă
async function hashPassword(password) {
  try {
    // Numărul de runde de sărare pentru generarea hash-ului
    const saltRounds = 10;
    // Generează hash-ul pentru parolă folosind bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // În caz de eroare, aruncă eroarea pentru a fi gestionată în altă parte a codului
    throw error;
  }
}

// Funcția pentru verificarea unei parole
async function checkPassword(password, hashedPassword) {
  try {
    // Verifică dacă parola coincide cu hash-ul stocat folosind bcrypt
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    // În caz de eroare, aruncă eroarea pentru a fi gestionată în altă parte a codului
    throw error;
  }
}

module.exports = {
  hashPassword,
  checkPassword
};
