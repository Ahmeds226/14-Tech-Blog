// Imports:
const router = require("express").Router();
const { User } = require("../../models");

// Logout:
router.post("/", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Export:
module.exports = router;
