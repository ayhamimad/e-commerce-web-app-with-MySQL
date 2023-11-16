"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var express = require('express');
var ordersController = require("../controllers/orders.controller");
var router = express.Router();
//import* as ordersController from '../controllers/orders.controller'
router.put('/:orderId', passport.authenticate('jwt', { session: false }), ordersController.changeOrderStatusAndPutAddress);
router.delete('/order_items/:orderItemId', passport.authenticate('jwt', { session: false }), ordersController.deleteOrderItem);
router.get('/in_cart', passport.authenticate('jwt', { session: false }), ordersController.getInProgress);
exports.default = router;
