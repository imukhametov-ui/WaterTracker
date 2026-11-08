
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

// REGISTER
export async function register(
  req: Request,
  res: Response
): Promise<void> {
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Invalid registration data",
      errors: validation.error.flatten(),
    });
    return;
  }

  const { name, email, password } = validation.data;

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        message: "User with this email already exists",
      });
      return;
    }

    throw error;
  }
}

// LOGIN
export async function login(
  req: Request,
  res: Response
): Promise<void> {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Invalid login data",
      errors: validation.error.flatten(),
    });
    return;
  }

  const { email, password } = validation.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = jwt.sign(
    { userId: user.id },
    env.JWT_SECRET,
    { expiresIn: "1h", algorithm: "HS256" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
