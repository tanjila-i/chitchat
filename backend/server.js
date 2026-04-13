import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./configs/db.js";
import authRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messaheRouter.js";
import { app, server } from "./lib/socket.js";

const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL || "https://chitchat-fon.onrender.com", credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// All routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// API check
app.get("/test", (req, res) => {
  res.send("Server is running...");
});

server.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});

// server error hanel
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
