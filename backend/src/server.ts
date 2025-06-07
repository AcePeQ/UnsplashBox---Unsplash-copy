import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./configs/db.config";

// Configurate and load every global env variables from .env file to process.env
dotenv.config();

// Create server
const app = express();

// Get the port variable from the env file
const PORT = process.env.PORT;

// Add middleware CORS to the app, so server can accept requests connection from different domains
app.use(cors());

// Listen for the connection on provided PORT and connect to the db
app.listen(PORT, () => {
  console.log(`UnsplashBox server is running on port ${PORT}`);
  connectDB();
});
