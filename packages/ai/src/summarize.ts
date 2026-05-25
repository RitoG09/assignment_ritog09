import { groqModel } from "./providers/groq.provider";

export const summarizeChunk = async (chunk: string) => {
  const response = await groqModel.invoke(`
Summarize the following educational content into concise study material.

Focus on:
- concepts
- formulas
- definitions
- important facts
- examples

CONTENT:
${chunk}
`);

  return response.content.toString();
};
