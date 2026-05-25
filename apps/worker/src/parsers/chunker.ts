import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const chunkText = async (text: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 3000,
    chunkOverlap: 300,
  });
  return splitter.splitText(text);
};
