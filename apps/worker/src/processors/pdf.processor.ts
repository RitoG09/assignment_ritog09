import { Job } from "bullmq";
import fs from "fs";
import path from "path";
import { savePdfUrl, getAssignmentById } from "@repo/database";
import { cloudinary } from "@repo/storage";
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

  const absolutePath = path.resolve(__dirname, "../../", pdfPath);

  try {
    console.log(`Uploading local PDF to Cloudinary for ${assignmentId}...`);
    const uploadResult = await cloudinary.uploader.upload(absolutePath, {
      folder: "veda-ai/pdfs",
      resource_type: "auto",
    });

    console.log(`Successfully uploaded to Cloudinary: ${uploadResult.secure_url}`);

    await savePdfUrl(assignmentId, uploadResult.secure_url);
    console.log(`PDF URL saved to database for ${assignmentId}`);
  } catch (error) {
    console.error(`Failed to upload generated PDF for ${assignmentId}:`, error);
    throw error;
  } finally {
    // Clean up temporary local PDF file
    if (fs.existsSync(absolutePath)) {
      try {
        fs.unlinkSync(absolutePath);
        console.log(`Cleaned up temporary local PDF for ${assignmentId}`);
      } catch (cleanupError) {
        console.error(`Failed to delete temporary local PDF at ${absolutePath}:`, cleanupError);
      }
    }
  }
};

