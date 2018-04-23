const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");


router.get("/dogs", (req, res, next) => {
  res.render("dogs/index", { user: req.user });
});

router.get("/dogs/:id", (req, res, next) => {
  res.render("dogs/profile", { user: req.user });
});


module.exports = router;