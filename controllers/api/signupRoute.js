// Imports:
const router = require("express").Router();
const { response } = require("express");

// Imported models:
const { User } = require("../../models");

// Create an account:
router.post("/", async (req, res) => {
  const findUser = await User.findOne({
    where: { username: req.body.username },
  });

  // User picked a username in use:
  if (findUser) {
    res.status(400).json({
      message:
        "Seems as though there is a user with that username. Click the login button to sign in or please pick an alternate username",
    });
    return;
  }
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Export:
module.exports = router;
