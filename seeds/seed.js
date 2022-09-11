// Imports:
// Import database connection from config.js
const sequelize = require("../config/connection");

// Import important parts of sequelize library
const { User, Post, Comment } = require("../models");

// Import data from respective .json files:
// User data:
const userData = require("./userData.json");

// Post data:
const postData = require("./postData.json");

// Comment data:
const commentData = require("./commentData.json");

// Seed the tech_blog_db:
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
