"use strict";
const User = require("../models/user");
const { Sequelize, literal } = require("sequelize");

/**
 * Creare user
 * creare cont user
 *
 * body User Creaza obiectul user (optional)
 * returns User
 **/
exports.createUser = function (body) {
  return new Promise(async function(resolve, reject) {
    if (!body.email || !body.name || !body.birth_date || !body.password || body.password.length < 8) {
      resolve({ status: 400, message: "Input invalid. Toate câmpurile sunt necesare sau parola trebuie să aibă minim 8 caractere." });
      return;
    }

    try {
      const newUser = await User.create({
        name: body.name,
        email: body.email,
        password: body.password, 
        birth_date: body.birth_date,
      });

      if (newUser) {
        resolve({ status: 201, data: newUser });
      } else {
        resolve({ status: 400, message: "Nu s-a putut crea utilizatorul." });
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error });
    }
  });
};



/**
 * Delete user
 * o poate face doar daca este logat la cont
 *
 * no response value expected for this operation
 **/
exports.deleteUser = function (email) {
  return new Promise(async function(resolve, reject) {
    try {
      const result = await User.destroy({ where: { email } });
      if (result === 0) {
        resolve({ status: 404, message: "Utilizatorul nu a fost găsit." });
      } else {
        resolve({ status: 202, message: "Utilizatorul s-a șters cu succes." });
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error });
    }
  });
};


/**
 * returneaza datele userului
 *
 * username String  (optional)
 * email String  (optional)
 * returns User
 **/
exports.getUser = function (email) {
  return new Promise(async function (resolve, reject) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        resolve({ status: 202, data: user });  
      } else {
        resolve({ status: 404, data: { message: "User not found" } }); 
      }
    } catch (error) {
      reject(error); 
    }
  });
};


/**
 * se conecteaza la cont
 *
 * returns User
 **/
exports.loginUser = function (email, password) {
  return new Promise(async function (resolve, reject) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        resolve({ status: 404, message: "Utilizatorul sau parola este incorectă." });
      } else if (user.password === password) {
        resolve({ status: 202, message: "Utilizator autentificat cu succes!" });
      } else {
        resolve({ status: 404, message: "Utilizatorul sau parola este incorectă." });
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error });
    }
  });
};


/**
 * Update user
 * o poate face doar daca este logat, poate sa si schimbe emailul sau parola
 *
 * body User Update an existent user in the store (optional)
 * email String  (optional)
 * password String  (optional)
 * no response value expected for this operation
 **/
exports.updateUser = function(email, password) {
  return new Promise(async function(resolve, reject) {
    try {
      if (!password || password.length < 8) { 
        resolve({ status: 400, message: "Inputul este invalid. Parola trebuie să fie de cel puțin 8 caractere." });
        return;
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        resolve({ status: 404, message: "Utilizatorul nu a fost găsit." });
      } else {
        user.password = password;
        await user.save();
        resolve({ status: 202, message: "S-a modificat parola cu succes." });
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error }); 
    }
  });
};

