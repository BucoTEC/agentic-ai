import mongoose from "mongoose";

const connectToDatabase = (db) => {
	mongoose
		.connect(db)
		.then(console.log("Conection to database is open"))
		.catch((err) => {
			console.log(`Ups there was an error: ${err}`);
		});
};

export default connectToDatabase;
