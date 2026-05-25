import { AssignmentStatus, QuestionType, SourceType } from "./common";

import { QuestionSection } from "./question";

export interface QuestionTypeConfig {
  type: QuestionType;
  count: number;
  marks: number;
}

export interface AssignmentInput {
  title?: string;
  sourceType: SourceType;
  dueDate?: string;
  text?: string;
  fileUrl?: string;
  additionalInstructions?: string;
  questionTypes: QuestionTypeConfig[];
}

export interface AssignmentProcessingPayload extends AssignmentInput {
  fileUrl?: string;
}

export interface GeneratedPaper {
  sections: QuestionSection[];
  totalQuestions: number;
  totalMarks: number;
}

export interface AssignmentDocument {
  _id: string;
  title?: string;
  status: AssignmentStatus;
  sourceType: SourceType;
  dueDate?: string;
  rawText?: string;
  additionalInstructions?: string;
  generatedPaper?: GeneratedPaper;
  fileUrl?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}
