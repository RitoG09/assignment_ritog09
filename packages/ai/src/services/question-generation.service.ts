import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { buildQuestionGenerationPrompt, SYSTEM_PROMPT } from "@repo/prompts";
import { AssignmentInput } from "@repo/shared-types";
import { aiQuestionGenerationResponseSchema } from "@repo/validators";
import { groqModel } from "../providers/groq.provider";
import { sanitizeLLMResponse } from "../utils/sanitize";
import { safeJsonParse } from "../parsers/json.parser";

export const generateQuestions = async (
  extractedText: string,
  config: AssignmentInput,
) => {
  const prompt = buildQuestionGenerationPrompt(extractedText, config);

  const response = await groqModel.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    new HumanMessage(prompt),
  ]);

  // langchain llm output match
  const content =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  // sanitization of response
  const sanitized = sanitizeLLMResponse(content);
  // Jsnon parsing of response
  const parsed = safeJsonParse(sanitized);
  // ai response validation (strict json output)
  const validated = aiQuestionGenerationResponseSchema.parse(parsed);

  return validated;
};
