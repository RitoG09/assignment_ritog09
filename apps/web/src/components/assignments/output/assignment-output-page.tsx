"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAssignmentPolling } from "./hooks/use-assignment-polling";

import { AssignmentLoading } from "./sections/assignment-loading";
import { AssignmentProcessing } from "./sections/assignment-processing";
import { AssignmentError } from "./sections/assignment-error";

import { GeneratedPaper } from "./paper/generated-paper";

function AssignmentOutputContent() {
  const searchParams = useSearchParams();

  const assignmentId = searchParams.get("id");

  console.log("assignmentId:", assignmentId);

  // Prevent hook from running with null
  const { assignment, loading, error } = useAssignmentPolling(assignmentId);

  // Search params not hydrated yet
  if (!assignmentId) {
    return <AssignmentLoading />;
  }

  if (loading) {
    return <AssignmentLoading />;
  }

  if (error) {
    return <AssignmentError message={error} />;
  }

  if (assignment?.status === "pending" || assignment?.status === "processing") {
    return <AssignmentProcessing step={assignment?.step} />;
  }

  if (assignment?.status === "failed") {
    return (
      <AssignmentError message={assignment.error || "Generation failed"} />
    );
  }

  // Assignment not ready yet
  if (!assignment) {
    return <AssignmentLoading />;
  }

  return (
    <GeneratedPaper
      generatedPaper={assignment.generatedPaper}
      assignmentId={assignment._id}
      subject={assignment.subject}
      class={assignment.class}
    />
  );
}

export function AssignmentOutputPage() {
  return (
    <Suspense fallback={<AssignmentLoading />}>
      <AssignmentOutputContent />
    </Suspense>
  );
}
