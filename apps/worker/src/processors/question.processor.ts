import { generateQuestions } from "@repo/ai";
import {
  saveGeneratedPaper,
  saveAssignmentError,
  updateAssignmentStatus,
} from "@repo/database";
import { Job } from "bullmq";
import { extractContent } from "../parsers/extractor";
import { emitSocketEvent } from "../services/socket.service";

export const processQuestionGenerationJob = async (job: Job) => {
  const { assignmentId, payload } = job.data;

  try {
    await updateAssignmentStatus(assignmentId, "processing");

    const extracredText = await extractContent({
      sourceType: payload.sourceType,
      filePath: payload.filePath,
      text: payload.text,
    });

    // before processing (websocket notification)
    await emitSocketEvent({
      assignmentId,
      event: "generation-progress",
      data: {
        status: "processing",
      },
    });

    // AI question generation (websocket notification)
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

    // after success (websocket notification)
    await emitSocketEvent({
      assignmentId,
      event: "generation-completed",
      data: {
        assignmentId,
      },
    });
    console.log(`Assignment ${assignmentId} completed`);
  } catch (error) {
    console.error(error);

    // after failed (websocket notification)
    await emitSocketEvent({
      assignmentId,
      event: "generation-failed",
      data: {
        error: error instanceof Error ? error.message : "Generation failed",
      },
    });

    await saveAssignmentError(
      assignmentId,
      error instanceof Error ? error.message : "Generation failed.",
    );
  }
};
