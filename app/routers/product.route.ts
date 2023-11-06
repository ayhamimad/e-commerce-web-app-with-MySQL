const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import * as searchController from "../controllers/search.controller";
import * as productPageController from "../controllers/productPage.controller";

router.get('/search',searchController.search);
router.get('/:productId',productPageController.productInfo);
router.get('/:productId/reviews',productPageController.productReviews);



export default router;