import type { AssignmentFormValues } from "./schemas";

export const QUESTION_TYPE_OPTIONS = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
] as const;

export type QuestionTypeOption = (typeof QUESTION_TYPE_OPTIONS)[number];

export const defaultAssignmentValues: AssignmentFormValues = {
  dueDate: "",
  additionalInfo: "",
  questionTypes: [
    { type: "Multiple Choice Questions", questions: 4, marks: 1 },
    { type: "Short Questions", questions: 3, marks: 2 },
    { type: "Diagram/Graph-Based Questions", questions: 5, marks: 5 },
    { type: "Numerical Problems", questions: 5, marks: 5 },
  ],
};

export const newQuestionTypeDefaults = {
  type: "Multiple Choice Questions",
  questions: 1,
  marks: 1,
} as const;
