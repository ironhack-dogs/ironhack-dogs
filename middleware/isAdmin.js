const Center = require("../models/Center");

const isAdmin = (redirectTo) => (req, res, next) => {
  Center.findById(req.params.id)
  .then((center) => {
    console.log(center.admin_id)
    console.log(req.user.id)
    if (center.admin_id == req.user.id) {
      req.center = center;
      next()
    } else {
      res.redirect("/no-permission")
    }
  })
  .catch(e => next(e))
}

module.exports = isAdmin;