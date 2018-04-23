const express = require("express");
const router = express.Router();
const Center = require("../models/Center");


router.get("/", (req, res, next) => {
  res.render("user/profile", { user: req.user });
});

router.get("/create-center", (req, res, next) => {
  res.render("user/create-center", { user: req.user });
});

router.post("/create-center", (req, res, next) => {
  const { name, phone, email, website_url, description } = req.body;
  console.log(req.user)
  const newCenter = new Center({
    name,
    email,
    phone,
    description,
    admin_id: req.user.id
  });
  newCenter.save().then(() => res.redirect("/my-profile"))

});


module.exports = router;