
import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  next
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  // Invalid JSON in request body
  if (
    error instanceof SyntaxError &&
    "status" in error &&
    error.status === 400 &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    res.status(400).json({
      message: "Invalid JSON in request body",
    });
    return;
  }

  console.error("API error:", error);

  res.status(500).json({
    message: "Internal server error",
    ...(env.NODE_ENV === "development" && {
      details:
        error instanceof Error
          ? error.message
          : "Unknown error",
    }),
  });
};
