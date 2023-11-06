"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var searchController = require("../controllers/search.controller");
var productPageController = require("../controllers/productPage.controller");
var productsController = require("../controllers/products.controller");
router.get('/search', searchController.search);
router.get('/', productsController.list);
router.get('/:productId', productPageController.productInfo);
router.get('/:productId/reviews', productPageController.productReviews);
//assets/images/brands/Zara_Logo 1.png
exports.default = router;
