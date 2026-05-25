import { PaperSection } from "./paper-section";

interface QuestionPaperProps {
  generatedPaper: {
    sections: any[];
    totalMarks: number;
    totalQuestions: number;
  };
}

export function QuestionPaper({ generatedPaper }: QuestionPaperProps) {
  return (
    <div className="rounded-[32px] bg-white px-10 py-12 shadow-sm">
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-[48px] font-bold tracking-[-0.04em] text-[#2A2A2A]">
            Delhi Public School, Sector-4, Bokaro
          </h1>

          <div className="space-y-1 text-[24px] font-semibold text-[#2A2A2A]">
            <p>Subject: English</p>

            <p>Class: 5th</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[20px] font-medium text-[#2A2A2A]">
          <p>Time Allowed: 45 minutes</p>

          <p>Maximum Marks: {generatedPaper.totalMarks}</p>
        </div>

        <div className="space-y-5 text-[18px] text-[#2A2A2A]">
          <p>All questions are compulsory unless stated otherwise.</p>

          <div className="space-y-1">
            <p>Name: __________________</p>

            <p>Roll Number: ____________</p>

            <p>Class: 5th Section: ________</p>
          </div>
        </div>

        <div className="space-y-14">
          {generatedPaper.sections.map((section, index) => (
            <PaperSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
