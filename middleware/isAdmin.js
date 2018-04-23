const Center = require("../models/Center");

const isAdmin = (redirectTo) => (req, res, next) => {
  Center.findById(req.params.id)
  .then((center) => {
    if (center.admin_id === req.user.id) {
      next()
    } else {
      res.redirect("/no-permission")
    }
  })
  .catch(e => next(e))
}

module.exports = isAdmin;