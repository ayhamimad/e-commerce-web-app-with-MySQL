"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var productController = require("../controllers/product.controller");
router.get('/search', productController.search);
exports.default = router;
