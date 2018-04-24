const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isSuperadmin = require("../middleware/isSuperadmin");

router.get("/", isSuperadmin(), (req, res, next) => {
  res.render("admin/index", { user: req.user})

<<<<<<< HEAD
router.get("/", (req, res, next) => {
  Dog.find()
  .then(dogs => {
    res.render("index", { user: req.user, title: "Madrid Adopta", dogs });
  })
=======
>>>>>>> abdallah
});



module.exports = router;