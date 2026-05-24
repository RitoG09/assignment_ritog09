import { z } from "zod";

export const assignmentSchema = z.object({
  dueDate: z.string().min(1, "Due date is required"),

  additionalInfo: z.string().optional(),

  questionTypes: z.array(
    z.object({
      type: z.string(),
      questions: z.number().min(1),
      marks: z.number().min(1),
    }),
  ),
});

export type AssignmentFormValues = z.infer<typeof assignmentSchema>;
