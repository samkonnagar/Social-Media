import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";

const app = express()

// Built In Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

// Setup dotenv
dotenv.config({
  path: "./.env",
});


app.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to Social Media Backend" })
);


// 404 Handler for undefined routes
import { ApiResponse } from "./utils/ApiResponse.js";

app.use((req, res, next) => {
  res.status(404).json(new ApiResponse(404, null, "Invalid Request"));
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}.`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed: ", err);
  });
