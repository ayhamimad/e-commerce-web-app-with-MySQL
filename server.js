"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var models_1 = require("./app/models");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
models_1.default.sequelize.sync();
app.get('/', function (req, res) {
    res.json({ message: 'welcome!!!!' });
});
//import bookRoutes from './app/routes/books.route';
//bookRoutes(app);
var Port = process.env.PORT || 3000;
app.listen(Port, function () {
    console.log("Server is running on ".concat(Port));
});
