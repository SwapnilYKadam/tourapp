import express from "express";
import { getAllTours, getTour } from './../controller/tourController.js'

const router = express.Router();


//GET ALL TOURS
router.route("/").get(getAllTours);

//GET A TOUR
router.get("/:id", getTour);

export default router;
