import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./configs/db.config";

// Configurate and load every env variables from .env file to process.env
dotenv.config();

// Create server
const app = express();

// Get the port variable from the .env file
const PORT = process.env.PORT;

// Add middleware CORS to the app, so server can accept requests connection from different domains
app.use(cors());

// Forcing server to only parse JSON payload and transform JSON to JS object, sharing it to the req.body and request connections with correct contenty-type
// It's added because if I would send a POST request with some data without it req.body would be undefined but with that req.body would contain the object passed to the body
app.use(express.json({ limit: "5mb" }));

// Listen for the connection on provided PORT and connect to the db
app.listen(PORT, () => {
  console.log(`UnsplashBox server is running on port ${PORT}`);
  connectDB();
});
