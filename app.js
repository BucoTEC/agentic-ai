import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import bookings from "./routes/bookings.js";
import errorHandler from "./middlwear/error-handler.js";
import cors from "cors";

//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//landing
app.get("/", (req, res) => {
  res.status(200).json("Wellcome to the bookign API");
});

//routes
app.use("/auth", auth);
app.use("/users", users);
app.use("/bookings", bookings);

// route catcher
app.all("*", (req, res, next) => {
  next(new Error("Route not found"));
});

//error handling
app.use(errorHandler);

// startup
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URL || "mongodb://localhost:27017/bookingAPI";
mongoose
  .connect(db)
  .then(console.log("Conection to database is open"))
  .catch((err) => {
    console.log(`Ups there was an error: ${err}`);
  });
app.listen(port, () => {
  console.log(`Server is operational on port: ${port}`);
});
