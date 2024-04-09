'use strict';

var utils = require('../utils/writer.js');
var Movie = require('../service/MovieService');

module.exports.moviesGET = function moviesGET (req, res, next) {
  Movie.moviesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.moviesIdGET = function moviesIdGET (req, res, next, id) {
  Movie.moviesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
