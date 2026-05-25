import { Request, Response } from "express";
import { assignmentInputSchema } from "@repo/validators";
import { createAssignmentWithJob } from "./assignment.service";
import {
  getAssignmentById,
  getAllAssignments,
  deleteAssignment,
} from "@repo/database";
import { pdfQueue, pdfQueueName } from "@repo/queue";

export const createAssignmentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const parseBody = {
      ...req.body,
      questionTypes: JSON.parse(req.body.questionTypes),
    };
    const validateData = assignmentInputSchema.parse(parseBody);
    const assignment = await createAssignmentWithJob({
      body: validateData,
      file: req.file,
    });

    return res.status(201).json({
      success: true,
      assignment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getAssignmentByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const assignment = await getAssignmentById(req.params.id as string);
    return res.json({
      success: true,
      assignment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
};

export const getAllAssignmentsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { search } = req.query;
    const assignments = await getAllAssignments(search as string);
    return res.json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
};

export const deleteAssignmentController = async (
  req: Request,
  res: Response,
) => {
  try {
    await deleteAssignment(req.params.id as string);
    return res.json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const exportPdfController = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.params.id;
    await pdfQueue.add(pdfQueueName, {
      assignmentId,
    });

    return res.json({
      success: true,
      message: "PDF generation started",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
    });
  }
};
