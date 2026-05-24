import { AppLayout } from "@/components/layout/app-layout";
import { AssignmentsEmptyState } from "@/components/assignments/empty-state";
import { AssignmentsGrid } from "@/components/assignments/assignments-grid";

export default function AssignmentsPage() {
  return (
    <AppLayout pageTitle="Assignment">
      <AssignmentsGrid />
    </AppLayout>
  );
}
