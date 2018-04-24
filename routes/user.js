const express = require("express");
const router = express.Router();
const Center = require("../models/Center");


// SEE PROFILE
router.get("/", (req, res, next) => {
  Center.findOne({"admin_id": req.user.id}).then(center => res.render("user/profile", { user: req.user, center }))
});


// CRUD CREATE CENTER
router.get("/create-center", (req, res, next) => {
  res.render("user/create-center", { user: req.user });
});

router.post("/create-center", (req, res, next) => {
  const { name, phone, email, website_url, description } = req.body;
  const newCenter = new Center({
    name,
    email,
    phone,
    description,
    admin_id: req.user.id
  });
  newCenter.save().then(() => res.redirect("/my-profile"));
});

module.exports = router;
