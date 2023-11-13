"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var express = require('express');
var router = express.Router();
var brandController = require("../controllers/brand.controller");
router.get('/', brandController.showBrands);
exports.default = router;
