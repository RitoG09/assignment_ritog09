import { Worker } from "bullmq";
import {redis} from "@repo/database";
import { pdfQueueName } from "@repo/queue";
import { processPdfJob } from "../processors/pdf.processor";

export const pdfWorker = new Worker(pdfQueueName, processPdfJob, {
  connection: redis,
});

