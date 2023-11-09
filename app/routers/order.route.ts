const passport = require("passport")
const express = require('express');
import { Request, Response } from 'express';
import * as ordersController from "../controllers/orders.controller"
const router = express.Router();
//import* as ordersController from '../controllers/orders.controller'

router.put('/:orderId',passport.authenticate('jwt', { session: false }),ordersController.placeOrder);
router.delete('/order_item/:orderItemId',passport.authenticate('jwt', { session: false }),ordersController.deleteOrderItem); 
export default router;