const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");


router.get("/dogs", (req, res, next) => {
  Dog.find()
  .then(dogs => {
    res.render("dogs/index", { user: req.user, dogs });
  });
});

router.get("/dogs/:id", (req, res, next) => {
  const dogID = req.params.id;
  Dog.findById(dogID)
    .then(dogData => {
      res.render("dogs/profile", {dogData})
    })
    .catch(error => {
      console.log(error);
    });
});


 
module.exports = router;