"use strict";
const Admin = require("../models/Admin");
const Movie = require("../models/movie");
const { Sequelize, literal } = require("sequelize");
const jwt = require("jsonwebtoken");

/**
 * login admin
 * 
 **/
exports.loginAdmin = function (email, password) {
    return new Promise(async function(resolve, reject) {
      try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
          resolve({ status: 404, message: "Utilizatorul sau parola este incorectă." });
          return;
        }
        
        console.log("Admin found: ", admin);
  
        if (admin.password !== password) {
          resolve({ status: 404, message: "Utilizatorul sau parola este incorectă." });
          return;
        }
  
        const token = jwt.sign(
          {
            email: admin.email,
            adminId: admin.id.toString(), // assuming `id` is the correct field
          },
          "somesupersecretsecret",
          { expiresIn: "1h" }
        );
        
        resolve({ status: 202, message: "Utilizator autentificat cu succes!", token: token, adminId: admin.id.toString() });
      } catch (error) {
        console.error("Eroare la server: ", error); // Log the error for debugging
        reject({ status: 500, message: "Eroare la server", error: error });
      }
    });
  }

exports.addMovie = function (name,type,runtime,release_year,raiting,description,picture) {
    return new Promise(async function(resolve, reject) {
        try {
            console.log("am intrat ",name," ", type, " ", runtime ," ", release_year, " ", raiting, " ", description, " ", picture);
            const newMovie = await Movie.create({
              name,
              type,
              runtime,
              release_year,
              picture,
              raiting,
              description
            });
            if (newMovie) {
                resolve({ status: 202, message: "Film adăugat cu succes!" });
            }
          } catch (error) {
            reject({ status: 500, message: "Eroare la server", error: error });
          }
    });
  };