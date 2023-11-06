"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var searchController = require("../controllers/search.controller");
var productsController = require("../controllers/products.controller");
router.get('/search', searchController.search);
router.get('/', productsController.list);
//assets/images/brands/Zara_Logo 1.png
exports.default = router;
