"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var reviews_model_1 = require("./reviews.model");
var order_model_1 = require("./order.model");
var userAddress_model_1 = require("./userAddress.model");
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
    User.hasMany((0, reviews_model_1.default)(sequelize), {
        foreignKey: "user_id"
    });
    User.hasMany((0, order_model_1.default)(sequelize), {
        foreignKey: "user_id"
    });
    User.hasMany((0, userAddress_model_1.default)(sequelize), {
        foreignKey: "user_id"
    });
    return User;
};
exports.default = userModel;
