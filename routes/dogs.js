const express = require("express");
const router = express.Router();
const User = require("../models/Dog");
const Dog = require("../models/Dog");
const Center = require("../models/Center");
const moment = require("moment");

// Create new dog

router.get("/new", (req, res, next) => {
  Center.findOne({ admin_id: req.user.id }).then(centerData => {
    res.render("dogs/new", { user: req.user, centerData });
  });
});

router.post("/new", (req, res, next) => {
  const {
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description,
    center
  } = req.body;
  const dog = new Dog({
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description,
    center
  });
  dog
    .save()
    .then(dog => res.redirect("/dogs"))
    .catch(e => next(e));
});

// Edit dog

router.get("/edit/:id", (req, res, next) => {
  Dog.findById(req.params.id).then(dogData => {
    dogData.formatedDate = moment(dogData.birthday).format("YYYY-MM-DD");
    res.render("dogs/edit", { user: req.user, dogData });
  });
});

router.post("/edit/:id", (req, res, next) => {
  const {
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description
  } = req.body;
  const updates = {
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description
  };
  Dog.findByIdAndUpdate(req.params.id, updates).then(() => {
    res.redirect(`/dogs/${req.params.id}`);
  });
});

// Dog index and Dog profile

router.get("/", (req, res, next) => {
  Dog.find().then(dogs => {
    console.log(req.user);
    res.render("dogs/index", { user: req.user, dogs });
  });
});

router.get("/:id", (req, res, next) => {
  Dog.findById(req.params.id)
    .populate("center")
    .then(dogData => {
      res.render("dogs/profile", { user: req.user, dogData });
    });
});

router.post("/search", (req, res, next) => {
  const { breed, gender, size } = req.body;
  if (breed === "") {
    Dog.find({ gender, size }).then(dogs => {
      console.log(req.user);
      res.render("dogs/index", { user: req.user, dogs });
    });
  } else {
    Dog.find({breed, gender, size }).then(dogs => {
      console.log(req.user);
      res.render("dogs/index", { user: req.user, dogs });
    });
  }
});

module.exports = router;
