const express = require("express");
const router = express.Router();
const Center = require("../models/Center");
const isAdmin = require("../middleware/isAdmin");

<<<<<<< HEAD
// List all centers
router.get("/centers", (req, res, next) => {
  Center.find().then(centers => res.render("centers/index", { user: req.user, centers }));
});
=======
>>>>>>> abdallah

// Show one center
router.get("/:id", (req, res, next) => {
  Center.findById(req.params.id)
  .then(center => res.render("centers/profile", { user: req.user, center }))
  .catch(e => next(e));
});

// CRUD Edit Center
<<<<<<< HEAD
router.get("/centers/:id/edit", isAdmin(), (req, res, next) => {
  res.render("centers/edit", { user: req.user, center: req.center });
=======
router.get("/:id/edit", isAdmin(), (req, res, next) => {  
  res.render("centers/edit", { user: req.user, center: req.center })
>>>>>>> abdallah
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
  res.render("centers/index", { user: req.user });
});

module.exports = router;
