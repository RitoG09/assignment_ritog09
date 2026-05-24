import { Queue } from "bullmq";
import { redis } from "@repo/database";

export const questionQueueName = "question-generation";

export const questionQueue = new Queue(questionQueueName, {
  connection: redis,
});
