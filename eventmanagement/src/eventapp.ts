import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/events", eventRoutes);

export default app;
