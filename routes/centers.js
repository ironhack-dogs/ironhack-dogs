const express = require("express");
const router = express.Router();
const Center = require("../models/Center");
const Dog = require("../models/Dog");
const isAdmin = require("../middleware/isAdmin");

// List all centers
router.get("/", (req, res, next) => {
  Center.find().then(centerData => {
    res.render("centers/index", { user: req.user, centerData });
  });
});

router.get("/:id", (req, res, next) => {
  Center.findById(req.params.id).then(centerData => {
    Dog.find({ center: centerData._id }).then(dogData => {
      res.render("centers/profile", { user: req.user, centerData, dogData });
    });
  });
});

// CRUD Edit Center
router.get("/:id/edit", isAdmin(), (req, res, next) => {
  res.render("centers/edit", { user: req.user, center: req.center });
});

router.post("/:id/edit", (req, res, next) => {
  const { name, phone, email, website_url, description } = req.body;
  const update = { name, phone, email, website_url, description };
  Center.findByIdAndUpdate(req.params.id, update)
    .then(() => res.redirect(`/centers/${req.params.id}`))
    .catch(e => next(e));
});

//CRUD Delete Center
router.get("/:id/delete", isAdmin(), (req, res, next) => {
  Center.findByIdAndRemove(req.center)
    .then(() => res.redirect("/my-profile"))
    .catch(e => next(e));
});

// List all centers
router.get("/", (req, res, next) => {
  Center.find().then(centers => {
    console.log(centers);
    res.render("centers/index", { user: req.user, centers });
  });
});

module.exports = router;
