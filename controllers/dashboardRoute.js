// Imports:
const router = require("express").Router();

// Imported models:
const { User, Post, Comment } = require("../models");

// Imported authorisation util:
const auth = require("../utils/auth");

// Get all users posts:
router.get("/", async (req, res) => {
  try {
    const user = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    // Dashboard posts
    const userPosts = user.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      userPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Get posts via id:
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Edit post:
    const editPost = post.get({ plain: true });
    res.render("editDeletePost", {
      editPost,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Imports:
module.exports = router;
