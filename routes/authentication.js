const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const flash = require("connect-flash");

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
    passReqToCallBack: false
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

// POST signup
router.post("/signup", ensureLoggedOut(), (req, res, next) => {
  const { username, email, password, name, surname } = req.body;
  if (username === "" || email === "" || password === "") {
    res.render("authentication/signup", {
      message: "can't leave fields empty"
    });
    return;
  }
  User.findOne({ username }).then(user => {
    if (user !== null) {
      res.render("authentication/signup", {
        message: "Username already exists"
      });
      return;
    }
    const hashPass = bcrypt.hashSync(password, bcryptSalt);
    const newUser = new User({
      username,
      name,
      surname,
      email,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        res.render("authentication/signup", {
        });
        return;
      }
      res.redirect("/");
    });
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
