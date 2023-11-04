"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var searchController = require("../controllers/search.controller");
router.get('/search', searchController.search);
//router.get('/products',productController.search);
exports.default = router;
