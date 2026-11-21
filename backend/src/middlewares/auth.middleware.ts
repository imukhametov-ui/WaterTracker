import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import { AUTH_COOKIE_NAME } from "../config/auth-cookie.js";

interface AuthPayload extends JwtPayload {
  userId: string;
}

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (typeof token !== "string" || !token) {
    res.status(401).json({
      message: "Authentication token required",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      !decoded.userId
    ) {
      res.status(401).json({
        message: "Invalid authentication token",
      });
      return;
    }

    const payload = decoded as AuthPayload;

    res.locals.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};
