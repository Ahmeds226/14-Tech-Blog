// Imports:
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// Import database connection from config.js
const sequelize = require("../config/connection");

// Initialize Comment model by extending off Sequelize's Model class
class Comment extends Model {}

// Comment fields:
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 250],
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
