"use strict";
const { Sequelize, literal } = require("sequelize");
const Review = require("../models/review");
const likeReview = require("../models/likeReview");
const User = require("../models/user");
/**
 * Retrieve reviews for a movie
 *
 * id Review ID of the movie to retrieve reviews for
 * returns List
 **/
exports.moviesIdReviewsGET = function (id) {
  return new Promise(async function (resolve, reject) {
    try {
      // Găsim toate recenziile pentru filmul cu id-ul dat
      const reviews = await Review.findAll({ where: { movieId: id } });
      console.log("Reviews found:", id);

      if (reviews.length > 0) {
        // Creăm o listă de userId-uri unice din recenzii
        const userIds = [...new Set(reviews.map((review) => review.userId))];
        console.log("User IDs:", userIds);

        // Găsim numele utilizatorilor corespunzători userId-urilor
        const users = await User.findAll({
          where: { id: userIds },
          attributes: ["id", "name"],
        });
        console.log("Users found:", users);

        // Creăm un dicționar pentru a asocia userId cu numele utilizatorului
        const userDictionary = {};
        users.forEach((user) => {
          userDictionary[user.id] = user.name;
        });
        console.log("User Dictionary:", userDictionary);

        // Adăugăm numele utilizatorului în recenzii
        const formattedReviews = reviews.map((review) => ({
          reviewId: review.id,
          userId: review.userId,
          userName: userDictionary[review.userId],
          movieId: review.movieId,
          message: review.message,
          post_date: review.post_date,
          like: review.like,
        }));
        console.log("Formatted Reviews:", formattedReviews);

        resolve({ status: 202, data: formattedReviews });
      } else {
        resolve({ status: 404, message: "Recenzia nu a fost găsită." });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      reject({ status: 500, message: "Eroare la server", error: error });
    }
  });
};

/**
 * Create a new review for a movie
 *
 * id Review ID of the movie to create a review for
 * returns Review
 **/
exports.moviesIdReviewsPOST = function (body, id, userId) {
  return new Promise(async function (resolve, reject) {
    try {
      const newReview = await Review.create({
        movieId: id,
        userId: userId,
        message: body.message,
        post_date: body.post_date,
      });

      if (newReview) {
        resolve({ status: 201, data: newReview });
      } else {
        resolve({ status: 400, message: "Nu s-a putut crea review-ul." });
      }
    } catch (error) {
      console.error("Error creating review:", error);
      reject({ status: 500, message: "Eroare la server" });
    }
  });
};

/**
 * Delete a review
 *
 * movie_id Movie ID of the movie that contains the review
 * review_id Review ID of the review to delete
 * no response value expected for this operation
 **/
exports.moviesMovie_idReviewsReview_idDELETE = function (movie_id, review_id) {
  return new Promise(async function (resolve, reject) {
    try {
      const result = await Review.destroy({
        where: {
          id: review_id,
          movieId: movie_id,
        },
      });
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
 * Like a review
 *
 * movie_id Movie ID of the movie that contains the review
 * review_id Review ID of the review to like
 * no response value expected for this operation
 **/
exports.moviesMovie_idReviewsReview_idLikePOST = function (
  userId,
  review_id,
  body
) {
  return new Promise(async function (resolve, reject) {
    try {
      const newLikeReview = await likeReview.create({
        userId: userId,
        ReviewId: review_id,
      });

      if (newLikeReview) {
        const review = await Review.findOne({ where: { id: review_id } });
        review.like = review.like + 1;
        await review.save();
        resolve({ status: 201, data: review });
      } else {
        resolve({ status: 404, message: "Recenzia nu a fost găsită" });
      }
    } catch (error) {
      console.error("Error creating review:", error);
      reject({ status: 500, message: "Eroare la server" });
    }
  });
};

/**
 * Update a review
 *
 * movie_id Movie ID of the movie that contains the review
 * review_id Review ID of the review to update
 * returns Review
 **/
exports.moviesMovie_idReviewsReview_idPUT = function (
  movie_id,
  review_id,
  body
) {
  return new Promise(async function (resolve, reject) {
    try {
      const review = await Review.findOne({
        where: {
          id: review_id,
          movieId: movie_id,
        },
      });
      review.message = body.message;
      review.post_date = body.post_date;
      await review.save();
      if (!review) {
        resolve({ status: 404, message: "Recenzia  nu a fost gasita." });
      } else {
        resolve({ status: 202, data: review });
      }
    } catch (error) {
      reject({ status: 500, message: "Eroare la server", error: error });
    }
  });
};
