const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Request = require("../models/Request");
const isSuperAdmin = require("../middleware/isSuperadmin");
const sendWelcomeMail = require("../mail/sendWelcomeMail");
const sendDenyMail = require("../mail/sendDenyMail");
const moment = require("moment")

router.get("/", isSuperAdmin(), (req, res, next) => {
  Request.find()
    .populate("user",["name", "email"])
    .then(requests => {
      requests.forEach(r => {
        r.created = moment(r.created_at).format('DD MMMM YYYY, h:mm:ss');
      })
      res.render("admin/index", { user: req.user, requests });
    })
    .catch(e => next(e));
});

// Aceptar solicitud para convertirse en Admin
router.get("/:id/accept", isSuperAdmin(), (req, res, next) => {
  Request.findByIdAndUpdate(req.params.id, { status: "Accepted" })
    .then(req => {
      User.findByIdAndUpdate(req.user, { role: "Admin", isAdmin: "true" })
        .then(user => {
          sendWelcomeMail(user.email);
          res.redirect("/admin");
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
});

// Rechazar solicitud para convertirse en Admin
router.get("/:id/deny", isSuperAdmin(), (req, res, next) => {
  Request.findByIdAndUpdate(req.params.id, { status: "Denied" })
    .then(request => {
      User.findById(req.user).then(user => {
        sendDenyMail(user.email);
        res.redirect("/admin");
      });
    })
    .catch(e => next(e));
});

module.exports = router;
