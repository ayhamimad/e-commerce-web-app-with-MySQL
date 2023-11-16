"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var products_model_1 = require("./products.model");
var user_model_1 = require("./user.model");
var wishlistModel = function (sequelize) {
    var Wishlist = sequelize.define("wishlist", {
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    });
    Wishlist.belongsTo((0, products_model_1.default)(sequelize), {
        foreignKey: "product_id",
    });
    Wishlist.belongsTo((0, user_model_1.default)(sequelize), {
        foreignKey: "user_id",
    });
    return Wishlist;
};
exports.default = wishlistModel;
