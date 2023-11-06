const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import * as productPageController from "../controllers/productPage.controller";
import * as productsController from "../controllers/products.controller"

router.get('/',productsController.list);
router.get('/:productId',productPageController.productInfo);
router.get('/:productId/related',productPageController.productRelated);
router.get('/:productId/reviews',productPageController.productReviews);


export default router;