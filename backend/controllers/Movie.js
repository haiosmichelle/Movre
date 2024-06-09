"use strict";

var utils = require("../utils/writer.js");
var Movie = require("../service/MovieService");

exports.moviesGET = (_req, res, _next) => {
  Movie.moviesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.moviesIdGET = (req, res, _next) => {
  const movieId = parseInt(req.params.movieId);
  console.log("mov " + movieId);
  Movie.moviesIdGET(movieId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
exports.moviesIdRatingPost = (req, res, _next) => {
  const movieId = parseInt(req.params.movieId);
  const body = req.body;
  const userId = req.userId;
  console.log("mov " + movieId);
  Movie.moviesIdRatingPost(movieId, body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
exports.moviesWatchList = (req, res, _next) => {
  const movieId = parseInt(req.params.movieId);
  const body = req.body;
  const userId = req.userId;
  console.log("mov " + body);
  Movie.moviesWatchList(movieId, body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getUserWatchList = (req, res, _next) => {
  const userId = req.userId;
  Movie.getUserWatchList(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
