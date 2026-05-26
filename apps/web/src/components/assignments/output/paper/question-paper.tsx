import { useState } from "react";
import { Eye, GraduationCap } from "lucide-react";
import { PaperSection } from "./paper-section";

interface QuestionPaperProps {
  generatedPaper: {
    sections: any[];
    totalMarks: number;
    totalQuestions: number;
  };
  subject?: string;
  class?: string;
}

export function QuestionPaper({
  generatedPaper,
  subject,
  class: className,
}: QuestionPaperProps) {
  const [mode, setMode] = useState<"student" | "teacher">("student");
  const showAnswers = mode === "teacher";

  return (
    <div className="rounded-[32px] bg-white px-10 py-12 shadow-sm">
      <div className="space-y-8">
        {/* Sleek Segmented Switch Toggle Mode */}
        <div className="flex justify-end border-b border-[#F2F2F2] pb-6">
          <div className="inline-flex rounded-full bg-[#F3F3F3] p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] select-none">
            <button
              type="button"
              onClick={() => setMode("student")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[15px] font-bold tracking-[-0.01em] transition-all cursor-pointer ${
                mode === "student"
                  ? "bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-[1.01]"
                  : "text-[#6B6B6B] hover:text-black"
              }`}
            >
              <Eye className="w-[18px] h-[18px]" strokeWidth={2.2} />
              Student Mode
            </button>
            <button
              type="button"
              onClick={() => setMode("teacher")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[15px] font-bold tracking-[-0.01em] transition-all cursor-pointer ${
                mode === "teacher"
                  ? "bg-[#151515] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] scale-[1.01]"
                  : "text-[#6B6B6B] hover:text-black"
              }`}
            >
              <GraduationCap className="w-[18px] h-[18px]" strokeWidth={2.2} />
              Teacher Mode
            </button>
          </div>
        </div>

        <div className="space-y-3 text-center">
          <h1 className="text-[48px] font-bold tracking-[-0.04em] text-[#2A2A2A]">
            Delhi Public School, Sector-4, Bokaro
          </h1>

          <div className="space-y-1 text-[24px] font-semibold text-[#2A2A2A]">
            <p>Subject: {subject || "English"}</p>

            <p>Class: {className || "5th"}</p>
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

            <p>Class: {className || "5th"} Section: ________</p>
          </div>
        </div>

        <div className="space-y-14">
          {filteredSections(generatedPaper.sections).map((section, index) => (
            <PaperSection
              key={index}
              section={section}
              showAnswers={showAnswers}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to filter out any empty sections
function filteredSections(sections: any[]) {
  if (!sections) return [];
  return sections.filter((s) => s && s.questions && s.questions.length > 0);
}
