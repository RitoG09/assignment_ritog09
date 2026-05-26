import { z } from "zod";

export const assignmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  class: z.string().min(1, "Class/Grade is required"),
  dueDate: z.string().optional(),
  additionalInfo: z.string().optional(),
  questionTypes: z.array(
    z.object({
      type: z.string(),
      count: z.number().min(1, "Count must be at least 1"),
      marks: z.number().min(1, "Marks must be at least 1"),
    }),
  ),
});

export type AssignmentFormValues = z.infer<typeof assignmentSchema>;

