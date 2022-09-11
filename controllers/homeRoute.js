// Import:
const router = require("express").Router();

// Imported models:
const { User, Post, Comment } = require("../models");

// Imported authorisation utility:
const auth = require("../utils/auth");

// Homepage:
router.get("/", async (req, res) => {
  try {
    const posted = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = posted.map((post) => post.get({ plain: true }));
    res.render("home", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login:
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Sign up:
router.get("/signup", (req, res) => {
  try {
    res.render("signUp");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get post via id and view all comments:
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const singlePost = post.get({ plain: true });

    res.render("post", {
      singlePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, message: "Something went wrong." });
  }
});

// Export:
module.exports = router;
