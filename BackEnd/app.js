import express from "express";
import bookingRoute from "./routes/bookingRoute";
const express = require("express");
const tourRoutes = require("./src/routes/tourRoutes");
const userRoutes = require("./src/routes/userARoutes");

const app = express();

app.use(express.json());

app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/booking", userRoutes);

module.exports = app;
