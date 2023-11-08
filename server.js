"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var product_route_1 = require("./app/routers/product.route");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
//db.sequelize.sync();   //{alter: true} remove it because we make the change and we don't need it dsad
app.use('/api/v1/products', product_route_1.default);
var Port = process.env.PORT || 3000;
app.listen(Port, function () {
    console.log("Server is running on ".concat(Port));
});
