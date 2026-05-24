import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    _id: false,
  },
);

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],

      default: "pending",
    },
    sourceType: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
    },
    rawText: {
      type: String,
    },
    additionalInstructions: {
      type: String,
    },
    generatedPaper: {
      sections: [sectionSchema],
      totalQuestions: Number,
      totalMarks: Number,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const AssignmentModel =
  (mongoose.models.Assignment as mongoose.Model<any>) ||
  mongoose.model("Assignment", assignmentSchema);
