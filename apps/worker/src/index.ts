import dotenv from "dotenv";
dotenv.config();
import "./workers/question.worker";
import "./workers/pdf.worker";
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

// (async () => {
//   await pdfQueue.add(
//     "generate-pdf",

//     {
//       assignmentId: "6a1403e1382c0dd76664ffcf",
//     },
//   );
// })();
