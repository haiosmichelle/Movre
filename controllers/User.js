"use strict";

var utils = require("../utils/writer.js");
var User = require("../service/UserService");

exports.createUser = (req, res, _next) => {
  const body = req.body;
  console.log(body);
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  User.getUser(username, email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.loginUser = (req, res, _next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.loginUser(email, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.updateUser = (req, res, _next) => {
  const body = req.body;
  const email = req.body.email;
  const password = req.body.password;
  User.updateUser(body, email, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
