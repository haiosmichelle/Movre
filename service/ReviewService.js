'use strict';


/**
 * Retrieve reviews for a movie
 *
 * id Review ID of the movie to retrieve reviews for
 * returns List
 **/
exports.moviesIdReviewsGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "user_id" : 1,
  "post_date" : "2000-01-23",
  "rating" : 5,
  "id" : 0,
  "movie_id" : 6,
  "message" : "message",
  "likes" : 5
}, {
  "user_id" : 1,
  "post_date" : "2000-01-23",
  "rating" : 5,
  "id" : 0,
  "movie_id" : 6,
  "message" : "message",
  "likes" : 5
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new review for a movie
 *
 * id Review ID of the movie to create a review for
 * returns Review
 **/
exports.moviesIdReviewsPOST = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : 1,
  "post_date" : "2000-01-23",
  "rating" : 5,
  "id" : 0,
  "movie_id" : 6,
  "message" : "message",
  "likes" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a review
 *
 * movie_id Movie ID of the movie that contains the review
 * review_id Review ID of the review to delete
 * no response value expected for this operation
 **/
exports.moviesMovie_idReviewsReview_idDELETE = function(movie_id,review_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Like a review
 *
 * movie_id Movie ID of the movie that contains the review
 * review_id Review ID of the review to like
 * no response value expected for this operation
 **/
exports.moviesMovie_idReviewsReview_idLikePOST = function(movie_id,review_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update a review
 *
 * movie_id Movie ID of the movie that contains the review
 * review_id Review ID of the review to update
 * returns Review
 **/
exports.moviesMovie_idReviewsReview_idPUT = function(movie_id,review_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : 1,
  "post_date" : "2000-01-23",
  "rating" : 5,
  "id" : 0,
  "movie_id" : 6,
  "message" : "message",
  "likes" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

