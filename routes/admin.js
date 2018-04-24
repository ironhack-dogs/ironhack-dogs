const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Request = require("../models/Request");
const isSuperadmin = require("../middleware/isSuperadmin");

router.get("/", isSuperadmin(), (req, res, next) => {
  Request.find()
  .populate("user")
    .then(requests => {
      res.render("admin/index", {requests});
    })
    .catch(e => next(e));
});


module.exports = router;
