import express from 'express';
import { loginController, registerController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
// roter object
const router = express.Router()

//routing
//register || method post

router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

router.get('/test', requireSignIn, isAdmin, testController);

export default router;