interface AssignmentErrorProps {
  message: string;
}

export function AssignmentError({ message }: AssignmentErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
