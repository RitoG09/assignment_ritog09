export const sanitizeLLMResponse = (response: string) => {
  return response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};
