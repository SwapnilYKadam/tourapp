import express from "express";
import { authUser, getUserProfile, registerUser } from './../controller/userController.js'
import { protect } from './../middleware/authMiddleware.js'

const router = express.Router();


//Authenticate
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/signup').post(registerUser)

export default router;
