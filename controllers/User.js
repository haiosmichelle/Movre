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
  const email = req.query.email;
  User.deleteUser(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getUser = (req, res, next) => {
  const email = req.query.email;
  User.getUser(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.loginUser = (req, res, _next) => {
  const email = req.query.email;
  const password = req.query.password;
  User.loginUser(email, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.updateUser = (req, res, _next) => {
  const email = req.query.email;
  const password = req.query.password;
  console.log("pass "+password);
  User.updateUser(email,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
