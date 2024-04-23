'use strict';
const Movie = require("../models/movie");
const Raiting = require("../models/raiting");
const { Sequelize, literal } = require("sequelize");
/**
 * Retrieve all movies
 *
 * returns List
 **/
exports.moviesGET = function() {
  return new Promise(async function(resolve, reject) {
    try {
      const movies = await Movie.findAll();
      if (movies && movies.length > 0) {
        resolve({ status: 202, data: movies }); 
      } else {
        resolve({ status: 404, message: "Nu s-a găsit niciun film." }); 
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error }); 
    }
  });
};



/**
 * Retrieve movie by ID
 *
 * id Movie ID of the movie to retrieve
 * returns Movie
 **/
exports.moviesIdGET = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      const movie = await Movie.findOne({ where: { id } });
      if (movie) {
        resolve({ status: 202, data: movie }); 
      } else {
        resolve({ status: 404, message: "Filmul nu a fost găsit." });  
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error }); 
    }
  });
};

exports.moviesIdRaitingPost = function(id, body) {
  return new Promise(async function(resolve, reject) {
    try {
      const newRaiting = await Raiting.create({ 
        userId: body.user_id,
        movieId: id,
        star: body.star  
      });

      console.log("rating " + newRaiting.star);

      if (newRaiting) {
        const ratings = await Raiting.findAll({where:{movieId: id}});
        let sum = 0;

        ratings.forEach(element => {
          sum += element.star; 
        });

        const movie = await Movie.findOne({where: {id: id}}); 
        if (movie && ratings.length > 0) {
          movie.raiting = parseFloat((sum / ratings.length).toFixed(2)) 
          await movie.save();
          resolve({ status: 200, data: movie }); 
        } else {
          resolve({ status: 404, message: "Filmul nu a fost găsit sau nu există ratinguri." });
        }
      } else {
        resolve({ status: 404, message: "Nu s-a putut crea ratingul." });
      }
    } catch (error) {
      console.error("Error creating rating:", error);
      reject({ status: 500, message: "Eroare la server", error: error }); // Eroare de server
    }
  });
};



