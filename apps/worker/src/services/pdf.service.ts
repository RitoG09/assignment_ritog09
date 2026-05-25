import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export const generateAssignmentPDF = async ({
  assignmentId,
  generatedPaper,
}: {
  assignmentId: string;
  generatedPaper: any;
}) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const pdfPath = path.join("pdfs", `${assignmentId}.pdf`);

      const absolutePath = path.resolve(__dirname, "../../", pdfPath);

      const doc = new PDFDocument({
        margin: 50,
      });

      const stream = fs.createWriteStream(absolutePath);

      doc.pipe(stream);

      // HEADER
      doc.fontSize(24).text("Generated Assignment", {
        align: "center",
      });

      doc.moveDown(2);

      generatedPaper.sections.forEach((section: any) => {
        doc.fontSize(18).text(section.title, {
          underline: true,
        });

        doc.moveDown();

        section.questions.forEach((question: any, index: number) => {
          doc.fontSize(12).text(`${index + 1}. ${question.question}`);
          doc.text(
            `Marks: ${question.marks} | Difficulty: ${question.difficulty}`,
          );
          doc.moveDown();
        });

        doc.moveDown(2);
      });

      doc.end();

      stream.on("finish", () => {
        resolve(pdfPath);
      });

      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
