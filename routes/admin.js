const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Center = require("../models/Center");

router.get("/", (req, res, next) => {
  Dog.find()
  .then(dogs => {
    res.render("index", { user: req.user, title: "Madrid Adopta", dogs });
    console.log(dogs);
  })
});



module.exports = router;