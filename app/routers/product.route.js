"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var searchController = require("../controllers/search.controller");
<<<<<<< HEAD
var productPageController = require("../controllers/productPage.controller");
router.get('/search', searchController.search);
router.get('/:productId', productPageController.productInfo);
router.get('/:productId/reviews', productPageController.productReviews);
=======
var productsController = require("../controllers/products.controller");
router.get('/search', searchController.search);
router.get('/', productsController.list);
//assets/images/brands/Zara_Logo 1.png
>>>>>>> d02c9438b3fc9684b6c624573bbeeac69f492a47
exports.default = router;
