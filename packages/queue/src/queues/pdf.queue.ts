import { Queue } from "bullmq";
import { redis } from "@repo/database";

export const pdfQueueName = "pdf-generation";

export const pdfQueue = new Queue(pdfQueueName, {
  connection: redis,
});
