import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export const generateAssignmentPDF = async ({
  assignmentId,
  generatedPaper,
  subject,
  class: className,
}: {
  assignmentId: string;
  generatedPaper: any;
  subject?: string;
  class?: string;
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

      if (subject || className) {
        doc.moveDown(0.5);
        let subText = "";
        if (subject) subText += `Subject: ${subject}`;
        if (className) {
          if (subText) subText += "  |  ";
          subText += `Class: ${className}`;
        }
        doc.fontSize(14).text(subText, {
          align: "center",
        });
      }

      doc.moveDown(2);

      generatedPaper.sections.forEach((section: any) => {
        doc.fontSize(18).text(section.title, {
          underline: true,
        });

        doc.moveDown();

        section.questions.forEach((question: any, index: number) => {
          doc.fontSize(12).text(`${index + 1}. ${question.question}`);
          doc.fontSize(10).text(
            `Marks: ${question.marks} | Difficulty: ${question.difficulty}`,
            { oblique: true }
          );

          if (question.options && question.options.length > 0) {
            doc.moveDown(0.2);
            question.options.forEach((option: string, idx: number) => {
              const letter = String.fromCharCode(65 + idx);
              doc.fontSize(11).text(`      ${letter}. ${option}`);
            });
            doc.moveDown(0.2);
          }

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
