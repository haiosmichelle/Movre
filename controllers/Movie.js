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
  const movieId = req.params.movieId;
  Movie.moviesIdGET(movieId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
