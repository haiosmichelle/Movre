'use strict';


/**
 * Retrieve all movies
 *
 * returns Movie
 **/
exports.moviesGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "release" : "2000-01-23",
  "name" : "name",
  "description" : "description",
  "runtime" : 6,
  "id" : 0,
  "picture" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve movie by ID
 *
 * id Movie ID of the movie to retrieve
 * returns Movie
 **/
exports.moviesIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "release" : "2000-01-23",
  "name" : "name",
  "description" : "description",
  "runtime" : 6,
  "id" : 0,
  "picture" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

