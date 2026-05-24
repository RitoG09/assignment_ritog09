import "./workers/question.worker";
import "./parsers/cleaner";
import "./parsers/pdf.parser";
import "./parsers/text.parser";
import { extractContent } from "./parsers/extractor";

console.log("Worker running");

(async () => {
  const text = await extractContent({
    sourceType: "pdf",
    filePath: "uploads/demo.pdf",
  });

  console.log(text);
})();
