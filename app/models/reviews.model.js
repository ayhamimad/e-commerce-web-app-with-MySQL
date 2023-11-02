"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var reviewsModel = function (sequelize) {
    var Review = sequelize.define('review', {
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        rating: {
            type: sequelize_1.DataTypes.DECIMAL,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
    return Review;
};
exports.default = reviewsModel;
