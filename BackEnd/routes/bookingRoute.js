import express from "express";
import { getCheckoutSession } from "./../controller/bookingController.js";
import { protect } from "./../middleware/authMiddleware.js";

const router = express.Router();
router.get("/checkoutsession/:tourId/:userId", protect, getCheckoutSession);

export default router;
