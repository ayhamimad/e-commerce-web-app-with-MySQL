"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var orderItem_model_1 = require("./orderItem.model");
var orderModel = function (sequelize) {
    var Order = sequelize.define('order', {
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        address_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('in_cart', 'processing', 'paid', 'canceled'),
            allowNull: false,
        },
        total_price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        tax: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
    });
    Order.hasMany((0, orderItem_model_1.default)(sequelize), {
        foreignKey: 'orderID', // This should match the foreign key in the Product model
    });
    return Order;
};
exports.default = orderModel;
