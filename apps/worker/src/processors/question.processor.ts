import fs from "fs";
import { generateQuestions } from "@repo/ai";
import {
  saveGeneratedPaper,
  saveAssignmentError,
  updateAssignmentStatus,
} from "@repo/database";
import { Job } from "bullmq";
import { extractContent } from "../parsers/extractor";
import { emitSocketEvent } from "../services/socket.service";
import { buildCompressedContext } from "../services/context.service";
import { downloadFile } from "../services/download.service";

export const processQuestionGenerationJob = async (job: Job) => {
  const { assignmentId, payload } = job.data;

  try {
    await updateAssignmentStatus(assignmentId, "processing");
    let tempFilePath: string | undefined;

    if (payload.sourceType === "pdf" && payload.fileUrl) {
      tempFilePath = await downloadFile(payload.fileUrl, `${assignmentId}.pdf`);
    }
    const extractedText = await extractContent({
      sourceType: payload.sourceType,
      fileUrl: tempFilePath,
      text: payload.text,
    });
    // CLEAN TEMP FILE
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    // before processing (websocket notification)
    await emitSocketEvent({
      assignmentId,
      event: "generation-progress",
      data: {
        status: "processing",
      },
    });

    await emitSocketEvent({
      assignmentId,
      event: "generation-progress",
      data: {
        step: "Chunking document...",
      },
    });
    // AI question generation (chunking + question generation)
    const compressedContext = await buildCompressedContext(extractedText);

    // before generating (websocket notification)
    await emitSocketEvent({
      assignmentId,
      event: "generation-progress",
      data: {
        step: "Generating questions...",
      },
    });
    const generatePaper = await generateQuestions(compressedContext, payload);

    const totalQuestions = generatePaper.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0,
    );

    const totalMarks = generatePaper.sections.reduce(
      (acc, section) =>
        acc + section.questions.reduce((a, q) => a + q.marks, 0),
      0,
    );

    await emitSocketEvent({
      assignmentId,
      event: "generation-progress",
      data: {
        step: "Structuring paper...",
      },
    });

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
