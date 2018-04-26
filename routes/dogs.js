const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const Dog = require("../models/Dog");
const Center = require("../models/Center");
const User = require("../models/User");
const moment = require("moment");
const sendDateMail = require("../mail/sendDateMail");

// Create new dog
router.get("/new", (req, res, next) => {
  Center.findOne({ admin_id: req.user.id }).then(centerData => {
    res.render("dogs/new", { user: req.user, centerData });
  });
});

router.post("/new", uploadCloud.single("picture-url"), (req, res, next) => {
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
  const picture_url = req.file.url;
  const dog = new Dog({
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description,
    center,
    picture_url
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
    dogs.forEach((e, i) => {
      moment.locale("es");
      e.relativeDate = moment(e.birthday).fromNow(true);
    });
    res.render("dogs/index", { user: req.user, dogs });
  });
});

router.get("/:id", (req, res, next) => {
  Dog.findById(req.params.id)
    .populate("center")
    .then(dogData => {
      console.log(dogData);
      moment.locale("es");
      dogData.relativeDate = moment(dogData.birthday).fromNow(true);
      res.render("dogs/profile", { user: req.user, dogData });
    });
});

router.post("/search", (req, res, next) => {
  const { breed, gender, size } = req.body;
  if (breed === "") {
    Dog.find({ gender, size }).then(dogs => {
      res.render("dogs/index", { user: req.user, dogs });
    });
  } else {
    Dog.find({ breed, gender, size }).then(dogs => {
      res.render("dogs/index", { user: req.user, dogs });
    });
  }
});

// Contact with the center of the dog
router.get("/:id/contact", (req, res, next) => {
  Dog.findById(req.params.id)
    .populate("center")
    .then(dog => {
      res.render("dogs/contact", { user: req.user, dog: dog });
    });
});

router.post("/:id/contact", (req, res, next) => {
  const { subject, message, user } = req.body;
  console.log(user);
  const user_email = req.user.email;
  Dog.findById(req.params.id)
    .populate("center")
    .then(dog => {
      const center_email = JSON.stringify(dog.center.email);
      sendDateMail(center_email, user_email, subject, message, user);
      res.redirect(`/dogs/${req.params.id}`);
    });
});

//Add dog to favorites
router.get("/:id/favorite", (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {$push: {favorites: req.params.id}})
  .then(() => res.redirect(`/dogs/${req.params.id}`))
});

module.exports = router;


//Add dog to favorites
router.get("/:id/removefav", (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {$pull: {favorites: req.params.id}})
  .then(() => res.redirect(`/dogs/${req.params.id}`))
});

module.exports = router;

