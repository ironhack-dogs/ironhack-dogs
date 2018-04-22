const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Center = require("../models/Center");

router.get("/dogs", (req, res, next) => {
  res.render("index", { user: req.user });
});

router.get("/dogs/:id", (req, res, next) => {
  res.render("index", { user: req.user });
});

router.get("/centers", (req, res, next) => {
  res.render("index", { user: req.user });
});

router.get("/centers/:id", (req, res, next) => {
  res.render("index", { user: req.user });
});

module.exports = router;