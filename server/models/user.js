"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        afterCreate: (user) => {
          delete user.dataValues.password;
        },
        afterUpdate: (user) => {
          delete user.dataValues.password;
        },
        // afterFind: (users) => {
        //   if (Array.isArray(users)) {
        //     users.forEach((user) => delete user.dataValues.password);
        //   } else if (users) {
        //     delete users.dataValues.password;
        //   }
        // },
      },
    }
  );

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  User.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.includePasswordTemporarily = async function () {
    const user = await User.findOne({
      where: { id: this.id },
      attributes: ["password"],
    });
    if (user) {
      this.password = user.password;
    }
  };

  return User;
};
