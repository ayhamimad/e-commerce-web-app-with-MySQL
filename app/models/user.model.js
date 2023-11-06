"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var userModel = function (sequelize) {
    var User = sequelize.define('user', {
        first_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone_number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    // User.hasMany(reviewsModel(sequelize), {
    //   foreignKey: "user_id",
    // });
    // User.hasMany(orderModel(sequelize), {
    //   foreignKey: "user_id",
    // });
    // User.hasMany(userAddressModel(sequelize), {
    //   foreignKey: "user_id",
    // });
    return User;
};
exports.default = userModel;
