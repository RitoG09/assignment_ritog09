export const dynamic = "force-dynamic";
export const revalidate = 0;

import { AppLayout } from "@/components/layout/app-layout";
import { AssignmentOutputPage } from "@/components/assignments/output/assignment-output-page";

export default function AssignmentOutput() {
  return (
    <AppLayout pageTitle="Create New">
      <AssignmentOutputPage />
    </AppLayout>
  );
}
