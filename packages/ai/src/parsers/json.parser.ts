export const safeJsonParse = <T>(value: string): T => {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error("Invalid JSON response from AI");
  }
};
