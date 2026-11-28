
import { Router } from "express";
import {
  register,
  login,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { prisma } from "../config/prisma.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticate, async (_req, res) => {
  const userId = res.locals.userId as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
    return;
  }

  res.status(200).json({ user });
});

export default router;
