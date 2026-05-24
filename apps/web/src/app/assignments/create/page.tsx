import { AppLayout } from "@/components/layout/app-layout";
import { AssignmentCreateForm } from "@/components/assignments/create/assignment-create-form";

export default function CreateAssignmentPage() {
  return (
    <AppLayout pageTitle="Assignment">
      <AssignmentCreateForm />
    </AppLayout>
  );
}