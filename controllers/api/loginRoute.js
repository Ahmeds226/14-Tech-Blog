const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userCheck = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    if (!userCheck) {
      res.status(400).json({ message: "Incorrect username" });
      return;
    }

    const validPassword = await userCheck.checkPw(req.body.password);

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

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
