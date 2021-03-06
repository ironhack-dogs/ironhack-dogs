const express = require("express");
const router = express.Router();
const Center = require("../models/Center");
const Dog = require("../models/Dog");
const User = require("../models/User");
const isAdmin = require("../middleware/isAdmin");
const moment = require("moment");
const uploadCloud = require("../config/cloudinary.js");

// List all centers
router.get("/", (req, res, next) => {
  Center.find().then(centerData => {
    res.render("centers/index", { user: req.user, centerData });
  });
});

// CRUD Create Center
router.get("/new", (req, res, next) => {
  req.user
    ? User.findById(req.user.id)
        .then(user => {
          user.isAdmin == true
            ? res.render("centers/new", { user: req.user })
            : res.redirect("/no-permission");
        })
        .catch(e => next(e))
    : res.redirect("/no-permission");
});

//List one center
router.get("/:id", (req, res, next) => {
  Center.findById(req.params.id).then(centerData => {
    Dog.find({ center: centerData._id }).then(dogData => {
      dogData.forEach(e => {
        moment.locale("es");
        e.relativeDate = moment(e.birthday).fromNow(true);
        if (req.user && req.user.id == centerData.admin_id) {
          e.isAdmin = true;
        }
      });
      console.log("pollo");
      res.render("centers/profile", {
        user: req.user,
        centerData,
        dogData
      });
    });
  });
});

// CRUD Edit Center
router.get("/:id/edit", isAdmin(), (req, res, next) => {
  res.render("centers/edit", { user: req.user, center: req.center });
});

router.post("/:id/edit", uploadCloud.single("banner"), (req, res, next) => {
  const { name, phone, email, website_url, description } = req.body;
  const banner_url = req.file.url;
  const update = { name, phone, email, website_url, description, banner_url };
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
