import { z } from "zod";

import { questionTypeSchema } from "./question.schema";

export const sourceTypeSchema = z.enum(["pdf", "text"]);

export const questionTypeConfigSchema = z.object({
  type: questionTypeSchema,
  count: z.number().min(1),
  marks: z.number().min(1),
});

export const assignmentInputSchema = z.object({
  title: z.string().optional(),
  sourceType: sourceTypeSchema,
  dueDate: z.string().optional(),
  text: z.string().optional(),
  additionalInstructions: z.string().optional(),
  questionTypes: z.array(questionTypeConfigSchema).min(1),
});

export type AssignmentInputSchemaType = z.infer<typeof assignmentInputSchema>;
