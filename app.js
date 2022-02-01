import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

//config
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json("Evrirtihing is working ok");
});

// startup
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is operational on port: ${port}`);
});
