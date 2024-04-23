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
  console.log("mov "+movieId)
  Movie.moviesIdGET(movieId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
exports.moviesIdRaitingPost = (req, res, _next) => {
  const movieId = parseInt(req.params.movieId);
  const body = req.body
  console.log("mov "+movieId)
  Movie.moviesIdRaitingPost(movieId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
