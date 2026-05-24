import { z } from "zod";

import { questionSectionSchema } from "./question.schema";

export const aiQuestionGenerationResponseSchema = z.object({
  sections: z.array(questionSectionSchema).min(1),
});

export type AiQuestionGenerationResponseSchemaType = z.infer<
  typeof aiQuestionGenerationResponseSchema
>;
