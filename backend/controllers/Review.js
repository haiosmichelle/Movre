"use strict";

var utils = require("../utils/writer.js");
var Review = require("../service/ReviewService");

exports.moviesIdReviewsGET = (req, res, next) => {
  const movieId = parseInt(req.params.movieId);
  console.log("review " + movieId);
  Review.moviesIdReviewsGET(movieId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesIdReviewsPOST = (req, res, next) => {
  const movieId = parseInt(req.params.movieId);
  const body = req.body;
  const userId = req.userId;
  Review.moviesIdReviewsPOST(body, movieId, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesMovie_idReviewsReview_idDELETE = (req, res, next) => {
  const movieId = parseInt(req.params.movieId);
  const reviewId = parseInt(req.params.reviewId);
  Review.moviesMovie_idReviewsReview_idDELETE(movieId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesMovie_idReviewsReview_idLikePOST = (req, res, next) => {
  const userId = parseInt(req.userId);
  const reviewId = parseInt(req.params.reviewId);
  const body = req.body;
  Review.moviesMovie_idReviewsReview_idLikePOST(userId, reviewId, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesMovie_idReviewsReview_idPUT = (req, res, next) => {
  const movieId = parseInt(req.params.movieId);
  const reviewId = parseInt(req.params.reviewId);

  const body = req.body;
  Review.moviesMovie_idReviewsReview_idPUT(movieId, reviewId, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
