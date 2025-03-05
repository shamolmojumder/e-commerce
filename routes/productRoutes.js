import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/prodcutController.js";
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

export default router;