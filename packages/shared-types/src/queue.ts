import { AssignmentInput } from "./assignment";

export interface questionGenerationJob {
  assignmentId: string;
  payload: AssignmentInput;
}

export interface PdfGenerationJob {
  assignmentId: string;
}
