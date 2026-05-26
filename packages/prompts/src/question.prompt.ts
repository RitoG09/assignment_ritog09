import { AssignmentInput } from "@repo/shared-types";

const sectionMap: Record<string, string> = {
  mcq: "Section A",
  short: "Section B",
  long: "Section C",
  diagram: "Section D",
  numerical: "Section E",
};

export const buildQuestionGenerationPrompt = (
  extractedText: string,
  config: AssignmentInput,
) => {
  const questionInstructions = config.questionTypes
    .map((q) => {
      return `
Generate ${q.count} ${q.type} questions.
Each question carries ${q.marks} marks.
`;
    })
    .join("\n");

  return `
Generate a question paper based on the following study material.

${config.subject ? `SUBJECT: ${config.subject}` : ""}
${config.class ? `TARGET CLASS/GRADE: ${config.class}` : ""}

STUDY MATERIAL:
${extractedText}

QUESTION REQUIREMENTS:
${questionInstructions}

ADDITIONAL INSTRUCTIONS:
${config.additionalInstructions || "None"}

IMPORTANT:
- Questions must be derived from the study material
- Maintain academic quality
- Avoid duplicate questions
- Return ONLY valid JSON
- Follow the exact response schema
- Group questions into sections
- Use proper difficulty levels
- For every generated question of any type, you MUST provide its correct answer key or model solution in the "answer" string field.
- For every "mcq" type question, you MUST provide exactly 4 choice options in the "options" string array, and make sure the "answer" string exactly matches one of those choices.

SECTION MAPPING:
${Object.entries(sectionMap)
  .map(([type, section]) => `${type} -> ${section}`)
  .join("\n")}
`;
};
