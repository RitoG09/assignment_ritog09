import { createAssignment } from "@repo/database";
import { questionQueue, questionQueueName } from "@repo/queue";
import {
  AssignmentInput,
  AssignmentProcessingPayload,
} from "@repo/shared-types";
import { uploadToCloudinary } from "../../services/upload.service";

interface CreateAssignmentParams {
  body: AssignmentInput;
  file?: Express.Multer.File;
}

export const createAssignmentWithJob = async ({
  body,
  file,
}: CreateAssignmentParams) => {
  let fileUrl = "";
  if (file) {
    const uploaded = await uploadToCloudinary(file);
    fileUrl = uploaded.secure_url;
  }

  const assignment = await createAssignment({
    ...body,
    fileUrl: fileUrl || undefined,
  });
  const payload: AssignmentProcessingPayload = {
    ...body,
    fileUrl: fileUrl || undefined,
  };


  //Publishing to the queue
  await questionQueue.add(questionQueueName, {
    assignmentId: assignment._id.toString(),
    payload,
  });

  return assignment;
};
