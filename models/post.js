// Imports:
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// Import database connection from config.js
const sequelize = require("../config/connection");

// Initialize post by extending off Sequelize's Model class
class Post extends Model {}

// Post details:
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Sets title length between 1 character to 50.
        len: [1, 50],
      },
    },

    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        // Contents length 1 character to 250.
        len: [1, 250],
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Export:
module.exports = Post;
