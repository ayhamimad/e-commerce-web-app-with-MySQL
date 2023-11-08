"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var user_model_1 = require("./user.model");
var userAddress_model_1 = require("./userAddress.model");
var orderModel = function (sequelize) {
    var Order = sequelize.define('order', {
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        address_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('in_cart', 'placed', 'paid', 'canceled'),
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
    // Order.hasMany(orderItemModel(sequelize), {
    //   foreignKey: 'orderID',
    // });
    Order.belongsTo((0, user_model_1.default)(sequelize), {
        foreignKey: 'user_id',
    });
    Order.belongsTo((0, userAddress_model_1.default)(sequelize), {
        foreignKey: 'address_id',
    });
    return Order;
};
exports.default = orderModel;
