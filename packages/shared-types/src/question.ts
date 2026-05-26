import { Difficulty, QuestionType } from "./common";

export interface Question {
  question: string;
  type: QuestionType;
  marks: number;
  difficulty: Difficulty;
  options?: string[];
  answer?: string;
}

export interface QuestionSection {
  title: string;
  questions: Question[];
}

