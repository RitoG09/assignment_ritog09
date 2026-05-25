import { Request, Response } from "express";
import { assignmentInputSchema } from "@repo/validators";
import { createAssignmentWithJob } from "./assignment.service";
import { getAssignmentById, getAllAssignments } from "@repo/database";

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
  _req: Request,
  res: Response,
) => {
  try {
    const assignments = await getAllAssignments();
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
