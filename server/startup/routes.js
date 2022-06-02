const express = require("express");
const cors = require("cors");

const auth = require("../api/auth");
const users = require("../api/user");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
