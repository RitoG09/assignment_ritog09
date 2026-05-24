import path from "path";
import { createAssignment } from "@repo/database";
import { questionQueue, questionQueueName } from "@repo/queue";
import {
  AssignmentInput,
  AssignmentProcessingPayload,
} from "@repo/shared-types";

interface CreateAssignmentParams {
  body: AssignmentInput;
  file?: Express.Multer.File;
}

export const createAssignmentWithJob = async ({
  body,
  file,
}: CreateAssignmentParams) => {
  const assignment = await createAssignment(body);
  const payload: AssignmentProcessingPayload = {
    ...body,
    filePath: file ? path.join("uploads", file.filename) : undefined,
  };

  //Publishing to the queue
  await questionQueue.add(questionQueueName, {
    assignmentId: assignment._id.toString(),
    payload,
  });

  return assignment;
};
