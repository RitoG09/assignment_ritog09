import { AssignmentModel } from "../models/assignment.model";
import { AssignmentInput, GeneratedPaper } from "@repo/shared-types";

export const createAssignment = async (payload: AssignmentInput) => {
  return AssignmentModel.create({
    ...payload,
    status: "pending",
  });
};

export const updateAssignmentStatus = async (
  assignmentId: string,
  status: "processing" | "completed" | "failed",
) => {
  return AssignmentModel.findByIdAndUpdate(
    assignmentId,
    {
      status,
    },
    {
      new: true,
    },
  );
};

export const saveGeneratedPaper = async (
  assignmentId: string,
  generatedPaper: GeneratedPaper,
) => {
  return AssignmentModel.findByIdAndUpdate(
    assignmentId,
    {
      generatedPaper,
      status: "completed",
    },
    {
      new: true,
    },
  );
};

export const saveAssignmentError = async (
  assignmentId: string,
  error: string,
) => {
  return AssignmentModel.findByIdAndUpdate(
    assignmentId,
    {
      status: "failed",
      error,
    },
    {
      new: true,
    },
  );
};

export const getAssignmentById = async (assignmentId: string) => {
  return AssignmentModel.findById(assignmentId);
};

export const getAllAssignments = async () => {
  return AssignmentModel.find().sort({
    createdAt: -1,
  });
};
