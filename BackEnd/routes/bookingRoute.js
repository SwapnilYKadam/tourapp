import express from "express";
import { getCheckoutSession } from "./../controller/bookingController.js";
import { protect } from "./../middleware/authMiddleware.js";

const router = express.Router();
// router.get("/", getCheckoutSession);
router.get("/checkoutsession/:tourId/:userId", getCheckoutSession);

export default router;
