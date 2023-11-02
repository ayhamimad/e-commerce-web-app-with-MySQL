"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_config_1 = require("../config/db.config");
var brands_model_1 = require("./brands.model");
var category_model_1 = require("./category.model");
var order_model_1 = require("./order.model");
var orderItem_model_1 = require("./orderItem.model");
var products_model_1 = require("./products.model");
var reviews_model_1 = require("./reviews.model");
var user_model_1 = require("./user.model");
var userAddress_model_1 = require("./userAddress.model");
//initializes a new Sequelize instance connecting to a database using the configuration parameters stored in the bookConfig object
var sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    dialect: db_config_1.dbConfig.DIALECT,
    pool: {
        max: db_config_1.dbConfig.pool.max,
        min: db_config_1.dbConfig.pool.min,
        acquire: db_config_1.dbConfig.pool.acquire,
        idle: db_config_1.dbConfig.pool.idle
    },
    define: {
        freezeTableName: true,
    },
});
var db = {};
db.Sequelize = sequelize_1.Sequelize; //This line assigns the Sequelize constructor to the Sequelize property of the db object. It allows you to use db.Sequelize to access the Sequelize constructor in other parts of your code.
db.sequelize = sequelize;
db.brand = (0, brands_model_1.default)(sequelize);
db.category = (0, category_model_1.default)(sequelize);
db.order = (0, order_model_1.default)(sequelize);
db.order_item = (0, orderItem_model_1.default)(sequelize);
db.product = (0, products_model_1.default)(sequelize);
db.review = (0, reviews_model_1.default)(sequelize);
db.user = (0, user_model_1.default)(sequelize);
db.user_address = (0, userAddress_model_1.default)(sequelize);
exports.default = db;
