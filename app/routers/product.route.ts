const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import * as searchController from "../controllers/search.controller";

router.get('/search',searchController.search);
//router.get('/products',productController.search);


export default router;