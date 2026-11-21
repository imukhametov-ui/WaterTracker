import type { CookieOptions } from "express";
import { env } from "./env.js";

export const AUTH_COOKIE_NAME = "watertracker_token";

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 60 * 60 * 1000,
};
