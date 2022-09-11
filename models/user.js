// Imports:
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// Import bcrpyt:
const bcrypt = require("bcrypt");

// Import database connection from config.js
const sequelize = require("../config/connection");

// Initialize User model by extending off Sequelize's Model class
class User extends Model {
  checkPw(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Username and Password fields:
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Sets password length to 8
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Export:
module.exports = User;
