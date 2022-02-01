import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import bookings from "./routes/bookings.js";

dotenv.config();
const app = express();

//config
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json("Evrirtihing is working ok");
});

app.use("/auth", auth);
app.use("/users", users);
app.use("/bookings", bookings);

// startup
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is operational on port: ${port}`);
});
