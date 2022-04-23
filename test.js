import dotenv from "dotenv";

dotenv.config();

const token = process.env.JWT_TOKEN;
console.log(token);
