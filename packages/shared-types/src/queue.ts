import { AssignmentProcessingPayload } from "./assignment";

export interface questionGenerationJob {
  assignmentId: string;
  payload: AssignmentProcessingPayload;
}

export interface PdfGenerationJob {
  assignmentId: string;
}
