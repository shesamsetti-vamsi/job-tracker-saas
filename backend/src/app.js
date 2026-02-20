import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

import healthRoutes from "./routes/health.routes.js";

const app = express();

/* =========================
   Security Middleware
========================= */

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(apiLimiter);

/* =========================
   Logging
========================= */

app.use(morgan("dev"));

/* =========================
   Body Parsing
========================= */

app.use(express.json());

/* =========================
   Routes
========================= */

app.use("/api/v1", healthRoutes);

/* =========================
   404 + Errors
========================= */

app.use(notFoundHandler);
app.use(errorHandler);

export default app;