const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Request = require("../models/Request");
const isSuperAdmin = require("../middleware/isSuperadmin");

router.get("/", isSuperAdmin(), (req, res, next) => {
  Request.find()
    .populate("user")
    .then(requests => {
      res.render("admin/index", {user:req.user, requests });
    })
    .catch(e => next(e));
});


// Aceptar solicitud para convertirse en Admin
router.get("/:id/accept", isSuperAdmin(), (req, res, next) => {
  Request.findByIdAndUpdate(req.params.id, { status: "Accepted" })
    .then(request => {
      User.findByIdAndUpdate(request.user, { role: "Admin", isAdmin: "true" })
        .then(res.redirect("/admin"))
        .catch(e => next(e));
    })
    .catch(e => next(e));
});

// Rechazar solicitud para convertirse en Admin
router.get("/:id/deny", isSuperAdmin(), (req, res, next) => {

});

module.exports = router;
