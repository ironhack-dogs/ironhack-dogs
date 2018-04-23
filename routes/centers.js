const express = require("express");
const router = express.Router();
const Center = require("../models/Center");

router.get("/centers", (req, res, next) => {
  res.render("centers/index", { user: req.user });
});

router.get("/centers/:id", (req, res, next) => {
  res.render("centers/profile", { user: req.user });
});

// router.get("/centers/:id/edit", "middleware", (req, res, next) => {
//   res.render("centers/profile", { user: req.user });
// });
module.exports = router;