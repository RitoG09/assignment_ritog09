"use client";

import { useSearchParams } from "next/navigation";
import { useAssignmentPolling } from "./hooks/use-assignment-polling";
import { AssignmentLoading } from "./sections/assignment-loading";
import { AssignmentProcessing } from "./sections/assignment-processing";
import { AssignmentError } from "./sections/assignment-error";
import { GeneratedPaper } from "./paper/generated-paper";

export function AssignmentOutputPage() {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("id");
  const { assignment, loading, error } = useAssignmentPolling(assignmentId);

  if (loading) {
    return <AssignmentLoading />;
  }

  if (error) {
    return <AssignmentError message={error} />;
  }

  if (assignment?.status === "pending" || assignment?.status === "processing") {
    return <AssignmentProcessing />;
  }

  if (assignment?.status === "failed") {
    return (
      <AssignmentError message={assignment.error || "Generation failed"} />
    );
  }

  return <GeneratedPaper generatedPaper={assignment.generatedPaper} />;
}
