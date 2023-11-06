"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var order_model_1 = require("./order.model");
var products_model_1 = require("./products.model");
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
    OrderItem.belongsTo((0, order_model_1.default)(sequelize), {
        foreignKey: 'orderID',
    });
    OrderItem.belongsTo((0, products_model_1.default)(sequelize), {
        foreignKey: 'productID',
    });
    return OrderItem;
};
exports.default = orderItemModel;
