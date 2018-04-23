const express = require("express");
const router = express.Router();
const Center = require("../models/Center");
const isAdmin = require("../middleware/isAdmin")

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
router.get("/centers/:id/edit", isAdmin(), (req, res, next) => {  
  res.render("centers/edit", { user: req.user, center: req.center })
});

router.post("/centers/:id/edit", (req, res, next) => {
  const { name, phone, email, website_url, description } = req.body;
  const update = { name, phone, email, website_url, description };
  Center.findByIdAndUpdate(req.params.id, update)
    .then(() => res.redirect(`/centers/${req.params.id}`))
    .catch(e => next(e));
});

//CRUD Delete Center
router.get("/centers/:id/delete", isAdmin(), (req, res, next) => {
  Center.findByIdAndRemove(req.center)
    .then(() => res.redirect("/my-profile"))
    .catch(e => next(e));
});

module.exports = router;
