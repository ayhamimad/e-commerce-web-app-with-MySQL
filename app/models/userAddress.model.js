"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var userAddressModel = function (sequelize) {
    var Address = sequelize.define('user_address', {
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        first_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        state: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        city: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        pin_code: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    });
    // Address.hasMany(orderModel(sequelize),{
    //   foreignKey: "address_id"
    // })
    return Address;
};
exports.default = userAddressModel;
