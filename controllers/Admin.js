"use strict";

var utils = require("../utils/writer.js");
var Admin = require("../service/AdminService");


exports.loginAdmin= (req, res, _next) => {
    const email = req.body.email;
  const password = req.body.password;
  console.log("pas ",email," ",password);
    Admin.loginAdmin(email, password)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };
  
  exports.addMovie= (req, res, _next) => {
    const  name=req.body.name;
    const type = req.body.type;
    const runtime= req.body.runtime;
    const release_year = req.body.release_year;
    const raiting = req.body.raiting;
    const description  = req.body.description;
    const picture = req.file ? req.file.filename : null;
    Admin.addMovie(name,type,runtime,release_year,raiting,description,picture)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };