"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var reviews_model_1 = require("./reviews.model");
var orderItem_model_1 = require("./orderItem.model");
var productModel = function (sequelize) {
    var Product = sequelize.define('product', {
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        short_description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        categoryID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        brandID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        stock_quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        rate: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        discount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        image_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    Product.hasMany((0, orderItem_model_1.default)(sequelize), {
        foreignKey: "productID"
    });
    Product.hasMany((0, reviews_model_1.default)(sequelize), {
        foreignKey: "product_id"
    });
    return Product;
};
exports.default = productModel;
