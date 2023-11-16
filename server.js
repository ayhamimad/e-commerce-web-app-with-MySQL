"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var product_route_1 = require("./app/routers/product.route");
var login_route_1 = require("./app/routers/login.route");
var order_route_1 = require("./app/routers/order.route");
var user_route_1 = require("./app/routers/user.route");
var address_route_1 = require("./app/routers/address.route");
var brand_route_1 = require("./app/routers/brand.route");
var category_route_1 = require("./app/routers/category.route");
var signup_route_1 = require("./app/routers/signup.route");
var wishlist_route_1 = require("./app/routers/wishlist.route");
// const app:Application=require("../dist/server");
var passport = require('passport'); // Import Passport.js
require("./app/config/passport.config");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(passport.initialize()); // Initialize Passport.js
//db.sequelize.sync({alter: true});   // remove it because we make the change and we don't need it dsad
app.use('/api/v1/products', product_route_1.default);
app.use('/api/v1/login', login_route_1.default);
app.use('/api/v1/orders', order_route_1.default);
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/addresses', address_route_1.default);
app.use('/api/v1/brands', brand_route_1.default);
app.use('/api/v1/categories', category_route_1.default);
app.use('/api/v1/signup', signup_route_1.default);
app.use('/api/v1/wishlist', wishlist_route_1.default);
var Port = process.env.PORT || 3000;
app.listen(Port, function () {
    console.log("Server is running on ".concat(Port));
});
