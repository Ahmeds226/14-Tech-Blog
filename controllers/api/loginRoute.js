// Imports:
const router = require("express").Router();

// Imported user models:
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    // Checks the database to see if the username is in the database
    const userCheck = await User.findOne({
      where: { username: req.body.username },
    });
    // If no username is found then the user is presented with a incorrect username please try again
    if (!userCheck) {
      res.status(400).json({ message: "Incorrect username" });
      return;
    }

    // Once the username is correct, the password is checked
    // The password is then checked to see if the username and password combination is correct
    const validPassword = await userCheck.checkPw(req.body.password);
    // If the password is incorrect then the appropiate message of incorrect message is displayed
    if (!validPassword) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userCheck.id;
      req.session.logged_in = true;
      res.json({ user: userCheck, message: "Successfully logged in" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Something went wrong please try again" });
    console.log(error);
  }
});

// Logout:
router.post("/logout", (req, res) => {
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
