import { SourceType } from "@repo/shared-types";
import { parsePdf } from "./pdf.parser";
import { parseText } from "./text.parser";
import { cleanExtractedText } from "./cleaner";

interface ExtractorInput {
  sourceType: SourceType;
  filePath?: string;
  text?: string;
}

export const extractContent = async ({
  sourceType,
  filePath,
  text,
}: ExtractorInput) => {
  let extractedText = "";
  switch (sourceType) {
    case "pdf":
      if (!filePath) {
        throw new Error("PDF file path missing");
      }
      extractedText = await parsePdf(filePath);
      break;
    case "text":
      if (!text) {
        throw new Error("Text missing");
      }
      extractedText = await parseText(text);
      break;
    default:
      throw new Error("Unsupported source type");
  }

  return cleanExtractedText(extractedText);
};
