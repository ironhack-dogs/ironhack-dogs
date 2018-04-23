const isSuperadmin = (redirectTo) => (req, res, next) => {
  if( req.user && req.user.role === "Superadmin") {
    next();
  } else {
    res.redirect(redirectTo);
  }
}

module.exports = isSuperadmin;