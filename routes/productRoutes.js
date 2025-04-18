import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, cashOnDelivery, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';

const router = express.Router();

// Create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//get routes
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product

router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search product 
router.get('/search/:keyword', searchProductController);

//similar product----related product
router.get('/related-product/:pid/:cid', relatedProductController);


// category wise product \
router.get('/product-category/:slug', productCategoryController)

//braintree 
router.get("/braintree/token", braintreeTokenController)

//payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController)
// cash-on-delivery
router.post('/cash-on-delivery', requireSignIn, cashOnDelivery);
export default router;