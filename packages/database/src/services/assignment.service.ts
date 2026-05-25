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
      returnDocument: "after",
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
      returnDocument: "after",
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
      returnDocument: "after",
    },
  );
};

export const getAssignmentById = async (assignmentId: string) => {
  return AssignmentModel.findById(assignmentId);
};

export const getAllAssignments = async (search?: string) => {
  const query = search ? { title: { $regex: search, $options: "i" } } : {};
  return AssignmentModel.find(query).sort({
    createdAt: -1,
  });
};

export const deleteAssignment = async (assignmentId: string) => {
  return AssignmentModel.findByIdAndDelete(assignmentId);
};

export const savePdfPath = async (assignmentId: string, pdfPath: string) => {
  return AssignmentModel.findByIdAndUpdate(
    assignmentId,
    {
      pdfPath,
    },
    {
      returnDocument: "after",
    },
  );
};
