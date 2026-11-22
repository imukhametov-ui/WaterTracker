import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createWaterRecord,
  getWaterRecords,
  updateWaterRecord,
  deleteWaterRecord,
  getTodayWaterTotal,
} from "../controllers/water-record.controller.js";

const router = Router();

router.post("/", authenticate, createWaterRecord);
router.get("/", authenticate, getWaterRecords);

// Важливо: /today має бути перед /:id
router.get("/today", authenticate, getTodayWaterTotal);

router.patch("/:id", authenticate, updateWaterRecord);
router.delete("/:id", authenticate, deleteWaterRecord);

export default router;