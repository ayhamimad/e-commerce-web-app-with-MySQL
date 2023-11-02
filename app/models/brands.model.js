"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var products_model_1 = require("./products.model");
var brandModel = function (sequelize) {
    var Brand = sequelize.define('brand', {
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
    Brand.hasMany((0, products_model_1.default)(sequelize), {
        foreignKey: 'brandID', // This should match the foreign key in the Product model
    });
    return Brand;
};
exports.default = brandModel;
