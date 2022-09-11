const auth = (req, res, next) => {
  // If the user isnt logged in then they will be redirected to the login page
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Export:
module.exports = auth;
