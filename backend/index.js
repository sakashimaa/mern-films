import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

// Configuration
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 7777;

// Routes
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 👍`);
});
