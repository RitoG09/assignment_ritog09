import { chunkText } from "../parsers/chunker";
import { summarizeChunk } from "@repo/ai";

export const buildCompressedContext = async (text: string) => {
  const chunks = await chunkText(text);

  console.log("Total chunks:", chunks.length);
  console.log("Processing chunks:", chunks.slice(0, 3).length);

  const summaries = await Promise.all(
    chunks.slice(0, 3).map((chunk) => summarizeChunk(chunk)),
  );

  return summaries.join("\n\n");
};
