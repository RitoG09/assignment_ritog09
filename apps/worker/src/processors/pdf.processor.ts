import { Job } from "bullmq";
import { savePdfPath, getAssignmentById } from "@repo/database";
import { generateAssignmentPDF } from "../services/pdf.service";

export const processPdfJob = async (job: Job) => {
  const { assignmentId } = job.data;

  const assignment = await getAssignmentById(assignmentId);

  if (!assignment?.generatedPaper) {
    throw new Error("Generated paper missing");
  }

  const pdfPath = await generateAssignmentPDF({
    assignmentId,
    generatedPaper: assignment.generatedPaper,
  });

  await savePdfPath(assignmentId, pdfPath);
  console.log(`PDF generated for ${assignmentId}`);
};
