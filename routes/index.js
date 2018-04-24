const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");

/* GET home page */
router.get("/", (req, res, next) => {
  Dog.find()
  .then(dogs => res.render("index", { user: req.user, title: "Madrid Adopta", dogs }))
});

router.get("/become-admin", (req, res, next) => res.render("become-admin"))

router.post("/become-admin", (req, res, next) => {
  let {user, subject, message} = req.body;
  User.findOne({username: user})
  .then(user => {
    if (user === null) {
      let failure = {message: "Lo sentimos ese usuario no existe en nuestra base de datos" } 
      console.log(failure)
      res.render("become-admin", {failure})
    } else {
      console.log(user)
    res.redirect("/become-admin")
    }
  })
  .catch(e => next(e))
})


router.get("/no-permission", (req, res, next) => {
  res.render("no-permission", {user: req.user})
});


module.exports = router;