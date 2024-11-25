import express from 'express';
import { loginController, registerController } from "../controllers/authController.js";
// roter object
const router = express.Router()

//routing
//register || method post

router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

export default router;