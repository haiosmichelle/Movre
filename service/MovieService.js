'use strict';
const Movie = require("../models/movie");
const Rating = require("../models/rating");
const watchList = require("../models/watchList");
const { Sequelize, literal } = require("sequelize");
/**
 * Retrieve all movies
 *
 * returns List
 **/
const baseUrl = 'http://localhost:8080/uploads';
exports.moviesGET = function() {
  return new Promise(async function(resolve, reject) {
    try {
      const movies = await Movie.findAll();
      if (movies && movies.length > 0) {
        const moviesWithImages = movies.map(movie => {
          return {
            ...movie.dataValues,
            imageUrl: `${baseUrl}/${movie.picture}`
          };
        });
        console.log("image "+moviesWithImages)
        resolve({ status: 202, data: moviesWithImages });
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
        const movieWithImage = {
          ...movie.dataValues,
          imageUrl: `${baseUrl}/${movie.picture}`
        };
        console.log("image "+movieWithImage)
        resolve({ status: 202, data: movieWithImage }); 
      } else {
        resolve({ status: 404, message: "Filmul nu a fost găsit." });  
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error }); 
    }
  });
};

exports.moviesIdRatingPost = function(id, body) {
  return new Promise(async function(resolve, reject) {
    try {
      const newRating = await Rating.create({ 
        userId: body.user_id,
        movieId: id,
        star: body.star  
      });

      console.log("rating " + newRating.star);

      if (newRaiting) {
        const ratings = await Rating.findAll({where:{movieId: id}});
        let sum = 0;

        ratings.forEach(element => {
          sum += element.star; 
        });

        const movie = await Movie.findOne({where: {id: id}}); 
        if (movie && ratings.length > 0) {
          movie.rating = parseFloat((sum / ratings.length).toFixed(2)) 
          await movie.save();
          resolve({ status: 200, data: movie }); 
        } else {
          resolve({ status: 404, message: "Filmul nu a fost găsit sau nu există ratinguri." });
        }
      } else {
        resolve({ status: 400, message: "Nu s-a putut crea ratingul." });
      }
    } catch (error) {
      console.error("Error creating rating:", error);
      reject({ status: 500, message: "Eroare la server", error: error }); // Eroare de server
    }
  });
};
exports.moviesWatchList = function(id, body) {
  return new Promise(async function(resolve, reject) {
    try {
      console.log("am intrat");
      const newWatchList = await watchList.create({ 
        userId: body.user_id,
        MovieId: id,
      });
      if (newWatchList) {
        resolve({ status: 201, data: newWatchList });
      } else {
        resolve({ status: 400, message: "Nu s-a putut crea watchList-ul." });
      }
    } catch (error) {
      console.error("Error creating rating:", error);
      reject({ status: 500, message: "Eroare la server", error: error }); // Eroare de server
    }
  });
};




