const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import * as productController from "../controllers/product.controller";

router.get('/search',productController.search);

export default router;