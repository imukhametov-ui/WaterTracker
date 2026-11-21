
import type { RequestHandler } from "express";
import { env } from "../config/env.js";

const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

export const verifyOrigin: RequestHandler = (req, res, next) => {
  if (safeMethods.has(req.method)) {
    next();
    return;
  }

  const origin = req.get("Origin");

  if (origin !== env.CLIENT_URL) {
    res.status(403).json({
      message: "Forbidden origin",
    });
    return;
  }

  next();
};
