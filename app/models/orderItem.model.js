"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var orderItemModel = function (sequelize) {
    var OrderItem = sequelize.define('order_item', {
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        orderID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        productID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        sub_total: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
    });
    return OrderItem;
};
exports.default = orderItemModel;
