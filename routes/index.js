const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");

/* GET home page */
router.get("/", (req, res, next) => {
   Dog.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count)
        Dog.findOne().skip(random).exec()
      .then(dogs => res.render("index", { user: req.user, title: "Madrid Adopta", dogs }))})})

;

module.exports = router;


router.get("/no-permission", (req, res, next) => {
  res.render("no-permission", {user: req.user})
});
