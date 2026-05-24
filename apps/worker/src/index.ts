import "./workers/question.worker";
import { connectMongo } from "@repo/database";

const startWorker = async () => {
  await connectMongo();
  console.log("Worker running...");
};
startWorker();

// (async () => {
//   const text = await extractContent({
//     sourceType: "pdf",
//     filePath: "uploads/demo.pdf",
//   });

//   console.log(text);
// })();
