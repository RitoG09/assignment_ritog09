import { z } from "zod";

import { assignmentInputSchema } from "./assignment.schema";

export const questionGenerationJobSchema = z.object({
  assignmentId: z.string(),
  payload: assignmentInputSchema,
});

export const pdfGenerationJobSchema = z.object({
  assignmentId: z.string(),
});
