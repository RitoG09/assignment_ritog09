import { z } from "zod";

export const difficultySchema = z.enum(["easy", "medium", "hard"]);

export const questionTypeSchema = z.enum([
  "mcq",
  "short",
  "long",
  "diagram",
  "numerical",
]);

export const questionSchema = z.object({
  question: z.string().min(5),
  type: questionTypeSchema,
  marks: z.number().min(1),
  difficulty: difficultySchema,
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
});

export const questionSectionSchema = z.object({
  title: z.string(),
  questions: z.array(questionSchema),
});

export type questionSectionSchemaType = z.infer<typeof questionSectionSchema>;
