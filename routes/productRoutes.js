import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController } from "../controllers/prodcutController.js";
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get routes
router.get("/get-product", getProductController)


export default router;