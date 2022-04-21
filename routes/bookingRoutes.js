import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.json("get all bookings");
});

router.get("/:id", (req, res) => {
	res.json("find one booking ");
});

router.post("/", (req, res) => {
	res.json("create booking");
});

router.patch("/:id", (req, res) => {
	res.json("update booking");
});

router.delete("/:id", (req, res) => {
	res.json("delete one booking");
});
export default router;
