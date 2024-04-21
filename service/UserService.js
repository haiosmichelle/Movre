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
  return new Promise(async function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      password: body.password,
      birth_date: body.birth_date,
      name: body.name,
      id: 0,
      email: body.email,
    };
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      birth_date: body.birth_date,
    });
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
  return new Promise(async function (resolve, reject) {
    const user = await User.destroy({ where: { email } });
    resolve({ message: "Utilizatorul s-a sters" });
  });
};

/**
 * returneaza datele userului
 *
 * username String  (optional)
 * email String  (optional)
 * returns User
 **/
exports.getUser = function () {
  return new Promise(async function (resolve, reject) {
    const examples = {};
    examples["application/json"] = {
      password: "password",
      birth_date: "2000-01-23",
      name: "name",
      id: 0,
      email: "email",
    };
    let users = [];
    users = await User.findAll();

    if (Object.keys(users).length > 0) {
      console.log(users);
      resolve();
    } else {
      resolve();
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
    let examples;
    console.log(email);
    const user = await User.findOne({ where: { email } });

    // Verifică dacă utilizatorul a fost găsit
    if (!user) {
      examples = { message: "Utilizatorul nu a fost găsit." };
    } else {
      // Verifică dacă parola furnizată corespunde cu parola stocată
      if (user.password === password) {
        examples = { message: "Utilizator autentificat cu succes!" };
      } else {
        examples = { message: "Parola furnizată este incorectă." };
      }
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve(examples);
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
exports.updateUser = function (body, email, password) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};
