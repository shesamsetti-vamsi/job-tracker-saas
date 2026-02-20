import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

/* =========================
   Security Middleware
========================= */

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000", // will change in production
    credentials: true,
  })
);

app.use(apiLimiter);

/* =========================
   Logging
========================= */

app.use(morgan("dev"));

/* =========================
   Body Parser
========================= */

app.use(express.json());

/* =========================
   Routes
========================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy 🚀",
  });
});

/* =========================
   404 + Error Handlers
========================= */

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
