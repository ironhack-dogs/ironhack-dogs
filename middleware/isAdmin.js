const isAdmin = (redirectTo) => (req, res, next) => {
  if( req.user && req.user.role === "Admin") {
    next();
  } else {
    res.redirect(redirectTo);
  }
}

module.exports = isAdmin;