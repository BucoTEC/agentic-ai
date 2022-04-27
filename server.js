import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import auth from "./routes/authRoutes.js";
import users from "./routes/userRoutes.js";
import bookings from "./routes/bookingRoutes.js";

import authVerification from "./middleware/auth.js";

import connectToDatabase from "./db/connectToDatabase.js";

import errorHandler from "./utils/error-handler.js";
import ResError from "./utils/ResError.js";

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
app.use("/api/auth", auth);
app.use("/api/users", authVerification, users);
app.use("/api/bookings", authVerification, bookings);

// route catcher
app.all("*", () => {
	throw new ResError(404, "Route not found");
});

//error handling
app.use(errorHandler);

// startup
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URL || "mongodb://localhost:27017/bookingAPI";

connectToDatabase(db);

app.listen(port, () => {
	console.log(`Server is operational on port: ${port}`);
});
