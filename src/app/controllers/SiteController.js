const express = require("express");
const app = express();

const Course = require("../models/Course");
const CreateUser = require("../models/CreateUser");
const { mutipleMongooseToObject } = require("../../util/mongoose");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const userName = require("./middlewareControllers");

// app.use(userName);

const index = (req, res, next) => {
  Course.find({})
    .then((courses) => {
      res.render("home", {
        courses: mutipleMongooseToObject(courses),
        username: req.myUsername,
      });
    })
    .catch(next);
};

const search = (req, res) => {
  const username = req.myUsername;

  res.send(`chao em nha ${username}`);
};

module.exports = {
  index,
  search,
};
