import type { AssignmentFormValues } from "./schemas";

export const QUESTION_TYPE_MAP = {
  "Multiple Choice Questions": "mcq",
  "Short Questions": "short",
  "Diagram/Graph-Based Questions": "diagram",
  "Numerical Problems": "numerical",
} as const;

export type QuestionTypeLabel = keyof typeof QUESTION_TYPE_MAP;
export const QUESTION_TYPE_OPTIONS = Object.keys(
  QUESTION_TYPE_MAP,
) as QuestionTypeLabel[];

export const defaultAssignmentValues: AssignmentFormValues = {
  dueDate: "",
  additionalInfo: "",
  questionTypes: [
    { type: "Multiple Choice Questions", count: 4, marks: 1 },
    { type: "Short Questions", count: 3, marks: 2 },
    { type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
    { type: "Numerical Problems", count: 5, marks: 5 },
  ],
};

export const newQuestionTypeDefaults = {
  type: "Multiple Choice Questions",
  count: 1,
  marks: 1,
} as const;
