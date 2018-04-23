const express = require("express");
const router = express.Router();
const Center = require("../models/Center");

// List all centers
router.get("/centers", (req, res, next) => {
  res.render("centers/index", { user: req.user });
});

// Show one center
router.get("/centers/:id", (req, res, next) => {
  Center.findById(req.params.id).then(center =>
    res.render("centers/profile", { user: req.user, center })
  );
});

// CRUD Edit Center
router.get("/centers/:id/edit", (req, res, next) => {
  Center.findById(req.params.id).then(center =>
    res.render("centers/edit", { user: req.user, center })
  );
});

module.exports = router;
