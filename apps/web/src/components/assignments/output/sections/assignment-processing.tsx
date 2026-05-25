interface AssignmentProcessingProps {
  step?: string;
}

export function AssignmentProcessing({ step }: AssignmentProcessingProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-neutral-300 border-t-black" />

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Generating Assignment</h2>

        <p className="text-neutral-500">{step || "Processing..."}</p>
      </div>
    </div>
  );
}
