import fs from "fs";
import pdf from "pdf-parse-new";

export const parsePdf = async (filePath: string) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    if (!data.text.trim()) {
      throw new Error("No extractable text found in PDF");
    }
    return data.text; // Full text content (refer: https://github.com/simonegosetto/pdf-parse-new)
  } catch (error) {
    console.error(error);
    throw error;
  }
};
