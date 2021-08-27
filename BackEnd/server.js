import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import tourRoutes from "./routes/tourRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import path from 'path'

const app = express();

app.use(express.json());

dotenv.config();

connectDB();



app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/booking", bookingRoute);

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/build')))
  app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html')) })
} else {
  app.get("/", (req, res) => {
    res.send("APi is running");
  });
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);
