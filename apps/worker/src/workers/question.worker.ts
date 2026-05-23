import { Worker, Job } from "bullmq";
import { redis } from "@repo/database";

const worker = new Worker(
  "question-generation",
  async (job: Job) => {
    console.log("processing job...");
    console.log(job.data);
  },
  {
    connection: redis,
  },
);

worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.log(`Job failed: ${job?.id}`);

  console.error(err);
});
