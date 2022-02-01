import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import bookings from "./routes/bookings.js";
import errorHandler from "./middlwear/error-handler.js";

dotenv.config();
const app = express();

//config
app.use(express.json());

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
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is operational on port: ${port}`);
});
