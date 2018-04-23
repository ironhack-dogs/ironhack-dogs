const express = require("express");
const router = express.Router();
const Center = require("../models/Center");

// List all centers
router.get("/centers", (req, res, next) => {
  res.render("centers/index", { user: req.user });
});

// Show one center
router.get("/centers/:id", (req, res, next) => {
  Center.findById(req.params.id)
    .then(center => res.render("centers/profile", { user: req.user, center }))
    .catch(e => next(e));
});

// CRUD Edit Center
router.get("/centers/:id/edit", (req, res, next) => {
  Center.findById(req.params.id)
    .then(center => res.render("centers/edit", { user: req.user, center }))
    .catch(e => next(e));
});

router.post("/centers/:id/edit", (req, res, next) => {
  const { name, phone, email, website_url, description } = req.body;
  const update = { name, phone, email, website_url, description };
  Center.findByIdAndUpdate(req.params.id, update)
    .then(() => res.redirect(`/centers/${req.params.id}`))
    .catch(e => next(e));
});

//CRUD Delete Center
router.get("/centers/:id/delete", (req, res, next) => {
  Center.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/my-profile"))
    .catch(e => next(e));
});

module.exports = router;
