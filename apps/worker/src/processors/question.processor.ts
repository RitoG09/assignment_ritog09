import { generateQuestions } from "@repo/ai";
import {
  saveGeneratedPaper,
  saveAssignmentError,
  updateAssignmentStatus,
} from "@repo/database";
import { Job } from "bullmq";
import { extractContent } from "../parsers/extractor";

export const processQuestionGenerationJob = async (job: Job) => {
  const { assignmentId, payload } = job.data;

  try {
    await updateAssignmentStatus(assignmentId, "processing");

    const extracredText = await extractContent({
      sourceType: payload.sourceType,
      filePath: payload.filePath,
      text: payload.text,
    });

    // AI question generation
    const generatePaper = await generateQuestions(extracredText, payload);

    const totalQuestions = generatePaper.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0,
    );

    const totalMarks = generatePaper.sections.reduce(
      (acc, section) =>
        acc + section.questions.reduce((a, q) => a + q.marks, 0),
      0,
    );

    await saveGeneratedPaper(assignmentId, {
      ...generatePaper,
      totalQuestions,
      totalMarks,
    });
    console.log(`Assignment ${assignmentId} completed`);
  } catch (error) {
    console.error(error);
    await saveAssignmentError(
      assignmentId,
      error instanceof Error ? error.message : "Generation failed.",
    );
  }
};
