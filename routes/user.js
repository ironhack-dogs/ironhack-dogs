const express = require("express");
const router = express.Router();
const Center = require("../models/Center");
const User = require("../models/User");
const moment = require("moment");
const googleMapsClient = require("../googleMaps/gmapsclient");

// SEE PROFILE
router.get("/", (req, res, next) => {
  moment.locale("es");
  Center.findOne({ admin_id: req.user.id }).then(center => {
    User.findById(req.user.id)
      .populate("favorites")
      .then(user => {
        
        user.favorites.forEach(e => {
          moment.locale("es");
          e.relativeDate = moment(e.birthday).fromNow(true);
        });
        
        res.render("user/profile", {
          user: req.user,
          dogs: user.favorites,
          center,
          since: moment(req.user.created_at).format("LL")
        });
      });
  });
});

// CRUD CREATE CENTER
router.get("/create-center", (req, res, next) => {
  res.render("user/create-center", { user: req.user });
});

router.post("/create-center", (req, res, next) => {
  let myAddress = req.body.address + " MADRID SPAIN";
  var myLocation;

  // Google Maps Geocoding
  googleMapsClient
    .geocode({ address: myAddress })
    .asPromise()
    .then(response => {
      myLocation = response.json.results[0].geometry.location;
      return myLocation;
    })
    .then(e => {
      let location = [e.lat, e.lng];
      const {
        name,
        phone,
        email,
        website_url,
        facebook_url,
        description
      } = req.body;
      const newCenter = new Center({
        name,
        email,
        website_url,
        facebook_url,
        phone,
        description,
        admin_id: req.user.id,
        address: req.body.address,
        location: {
          type: "Point",
          coordinates: location
        }
      });
      newCenter.save().then(() => res.redirect("/my-profile"));
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
