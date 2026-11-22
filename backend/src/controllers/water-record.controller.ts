
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma.js";
import {
  createWaterRecordSchema,
  updateWaterRecordSchema,
} from "../validators/water-record.validator.js";

export const createWaterRecord: RequestHandler = async (req, res, next) => {
  try {
    const result = createWaterRecordSchema.safeParse(req.body);


    if (!result.success) {
      res.status(400).json({
        message: "Invalid water record data",
        errors: result.error.flatten(),
      });
      return;
    }

    const userId = res.locals.userId as string | undefined;

    if (!userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const waterRecord = await prisma.waterRecord.create({
      data: {
        amount: result.data.amount,
        userId,
      },
    });

    res.status(201).json({
      message: "Water record created successfully",
      waterRecord,
    });
  } catch (error) {
    next(error);
  }
};
export const getWaterRecords: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId as string | undefined;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const waterRecords = await prisma.waterRecord.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      waterRecords,
    });
  } catch (error) {
    next(error);
  }
};
export const updateWaterRecord: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId as string | undefined;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid record ID" });
      return;
    }

    const validation = updateWaterRecordSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        message: "Invalid water record data",
        errors: validation.error.flatten(),
      });
      return;
    }

    const result = await prisma.waterRecord.updateMany({
      where: { id, userId },
      data: { amount: validation.data.amount },
    });

    if (result.count === 0) {
      res.status(404).json({ message: "Water record not found" });
      return;
    }

    const waterRecord = await prisma.waterRecord.findFirst({
      where: { id, userId },
    });

    res.status(200).json({
      message: "Water record updated successfully",
      waterRecord,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteWaterRecord: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId as string | undefined;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid record ID" });
      return;
    }

    const result = await prisma.waterRecord.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) {
      res.status(404).json({ message: "Water record not found" });
      return;
    }

    res.status(200).json({
      message: "Water record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getTodayWaterTotal: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId as string | undefined;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const now = new Date();

    const startOfDay = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      )
    );

    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

    const result = await prisma.waterRecord.aggregate({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      date: startOfDay.toISOString().slice(0, 10),
      totalAmount: result._sum.amount ?? 0,
    });
  } catch (error) {
    next(error);
  }
};