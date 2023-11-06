"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var products_model_1 = require("./products.model");
var categoryModel = function (sequelize) {
    var Category = sequelize.define('category', {
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    Category.hasMany((0, products_model_1.default)(sequelize), {
        foreignKey: 'categoryID', // This should match the foreign key in the Product model
    });
    return Category;
};
exports.default = categoryModel;
