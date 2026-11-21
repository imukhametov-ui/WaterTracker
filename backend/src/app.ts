import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";
import cookieParser from "cookie-parser";
import { verifyOrigin } from "./middlewares/origin.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", verifyOrigin);
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "WaterTracker API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Centralized error handling
app.use(errorHandler);

export default app;
