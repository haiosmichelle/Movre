"use strict";

var utils = require("../utils/writer.js");
var Review = require("../service/ReviewService");

exports.moviesIdReviewsGET = (req, res, next, id) => {
  Review.moviesIdReviewsGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesIdReviewsPOST = (req, res, next, id) => {
  Review.moviesIdReviewsPOST(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesMovie_idReviewsReview_idDELETE = (
  req,
  res,
  next,
  movie_id,
  review_id
) => {
  Review.moviesMovie_idReviewsReview_idDELETE(movie_id, review_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesMovie_idReviewsReview_idLikePOST = (
  req,
  res,
  next,
  movie_id,
  review_id
) => {
  Review.moviesMovie_idReviewsReview_idLikePOST(movie_id, review_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesMovie_idReviewsReview_idPUT = (
  req,
  res,
  next,
  movie_id,
  review_id
) => {
  Review.moviesMovie_idReviewsReview_idPUT(movie_id, review_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
