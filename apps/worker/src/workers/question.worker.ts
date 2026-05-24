import { Worker, Job } from "bullmq";
import {
  createAssignment,
  redis,
  saveGeneratedPaper,
  updateAssignmentStatus,
  connectMongo,
} from "@repo/database";
import { questionQueueName } from "@repo/queue";
import { generateQuestions } from "@repo/ai";

const worker = new Worker(
  questionQueueName,
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

//testing ai response:
// (async () => {
//   const result = await generateQuestions(
//     "Photosynthesis is the process by which plants...",
//     {
//       sourceType: "text",
//       questionTypes: [
//         {
//           type: "mcq",
//           count: 2,
//           marks: 1,
//         },
//       ],
//     },
//   );

//   console.log(JSON.stringify(result, null, 2));
// })();

//test db
// (async () => {
//   await connectMongo();
//   const assignment = await createAssignment({
//     sourceType: "text",
//     text: "sample text",
//     questionTypes: [
//       {
//         type: "mcq",
//         count: 2,
//         marks: 1,
//       },
//     ],
//   });
//   console.log(assignment);
//   await updateAssignmentStatus(assignment._id.toString(), "processing");
//   await saveGeneratedPaper(assignment._id.toString(), {
//     sections: [],
//     totalMarks: 10,
//     totalQuestions: 5,
//   });
// })();
