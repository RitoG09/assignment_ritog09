import { Difficulty, QuestionType } from "./common";

export interface Question {
  question: string;
  type: QuestionType;
  marks: number;
  difficulty: Difficulty;
}

export interface QuestionSection {
  title: string;
  questions: Question[];
}

