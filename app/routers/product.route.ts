const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import * as searchController from "../controllers/search.controller";
import * as productPageController from "../controllers/productPage.controller";
import * as productsController from "../controllers/products.controller"

router.get('/search',searchController.search);
router.get('/',productsController.list);
router.get('/:productId',productPageController.productInfo);
router.get('/:productId/reviews',productPageController.productReviews);



//assets/images/brands/Zara_Logo 1.png
export default router;