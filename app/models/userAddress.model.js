"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var order_model_1 = require("./order.model");
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
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    Address.hasMany((0, order_model_1.default)(sequelize), {
        foreignKey: "address_id"
    });
    return Address;
};
exports.default = userAddressModel;