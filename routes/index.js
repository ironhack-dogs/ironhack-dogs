const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Request = require("../models/Request");

/* GET home page */
router.get("/", (req, res, next) => {
  Dog.find().then(dogs =>
    res.render("index", { user: req.user, title: "Madrid Adopta", dogs })
  );
});

router.get("/become-admin", (req, res, next) => res.render("become-admin", req.user));

router.post("/become-admin", (req, res, next) => {
  let { user, subject, message } = req.body;
  User.findOne({ username: user })
    .then(user => {
      if (user === null) {
        const failure = {
          message: "Lo sentimos ese usuario no existe en nuestra base de datos"
        };
        console.log(failure);
        res.render("become-admin", { failure });
      } else {
        const request = new Request({ user: user.id, subject, message });
        request.save().then(() => {
          const success = {
            message:
              "Enhorabuena, tú solicitud está en proceso de revisión, cuando todo esté listo te enviaremos un email para dar de alta tu centro"
          };
          res.render("become-admin", {user:req.user, success });
        });
      }
    })
    .catch(e => next(e));
});

router.get("/no-permission", (req, res, next) => {
  res.render("no-permission", { user: req.user });
});

module.exports = router;
