
import { z } from "zod";

export const createWaterRecordSchema = z.object({
  amount: z
    .number()
    .int("Amount must be an integer")
    .positive("Amount must be greater than zero"),
});
export const updateWaterRecordSchema = createWaterRecordSchema;