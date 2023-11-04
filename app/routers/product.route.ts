const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import * as searchController from "../controllers/search.controller";
import * as productsController from "../controllers/products.controller"
router.get('/search',searchController.search);
router.get('/products',productsController.list);

//assets/images/brands/Zara_Logo 1.png
export default router;