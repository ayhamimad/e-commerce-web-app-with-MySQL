"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var products_model_1 = require("./products.model");
var user_model_1 = require("./user.model");
var reviewsModel = function (sequelize) {
    var Review = sequelize.define('review', {
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        rating: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
    Review.belongsTo((0, products_model_1.default)(sequelize), {
        foreignKey: 'product_id',
    });
    Review.belongsTo((0, user_model_1.default)(sequelize), {
        foreignKey: 'user_id',
    });
    return Review;
};
exports.default = reviewsModel;
