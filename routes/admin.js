const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isSuperadmin = require("../middleware/isSuperadmin");

router.get("/", isSuperadmin(), (req, res, next) => {
  res.render("admin/index", { user: req.user})

});


module.exports = router;