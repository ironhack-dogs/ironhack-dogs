const express = require("express");
const router = express.Router();
const Dog = require("../models/User");


router.get("/my-profile", (req, res, next) => {
  res.render("users/index", { user: req.user });
});

router.get("/users/:id", (req, res, next) => {
  res.render("users/profile", { user: req.user });
});


module.exports = router;