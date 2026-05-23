import { Queue } from "bullmq";
import { redis } from "@repo/database";

export const questionQueue = new Queue("question-generation", {
  connection: redis,
});
