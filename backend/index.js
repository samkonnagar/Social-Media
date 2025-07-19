import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import path from "path";
import { fileURLToPath } from "url";

// Create __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// routes import
import authRoutes from "./routes/auth.route.js";
import fileRoutes from "./routes/file.route.js";
import notificAationRoutes from "./routes/notifications.route.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";

// routes declaration
app.use("/api/auth", authRoutes);
app.use("/api/upload", fileRoutes);
app.use("/api/notifications", notificAationRoutes);
app.use("/api/post", postRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the "uploads/posts" directory
app.use("/files", express.static(path.join(__dirname, "uploads", "posts")));

// 404 Handler for undefined routes
import { ApiResponse } from "./utils/ApiResponse.js";

app.use((req, res, next) => {
  res.status(404).json(new ApiResponse(404, null, "Invalid Request"));
});

// Error handling
import handleError from "./middleware/errorHandler.middleware.js";

app.use(handleError);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}.`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed: ", err);
  });
