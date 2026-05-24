export interface GenerationStartedEvent {
  assignmentId: string;
  status: "processing";
}

export interface GenerationProgressEvent {
  assignmentId: string;
  progress: number;
  message: string;
}

export interface GenerationCompletedEvent {
  assignmentId: string;
  status: "completed";
}

export interface GenerationFailedEvent {
  assignmentId: string;
  status: "failed";
  error: string;
}
