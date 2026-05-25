import { OutputHeader } from "./output-header";
import { QuestionPaper } from "./question-paper";

interface GeneratedPaperProps {
  generatedPaper: {
    sections: any[];
    totalMarks: number;
    totalQuestions: number;
  };
}

export function GeneratedPaper({ generatedPaper, assignmentId }: GeneratedPaperProps & {assignmentId: string}) {
  return (
    <div className="mt-2 rounded-[38px] bg-[#5e5e5e] p-2 lg:px-7 lg:py-7">
      <div className="mx-auto max-w-[1400px] space-y-5">
        <OutputHeader assignmentId={assignmentId} />
        <QuestionPaper generatedPaper={generatedPaper} />
      </div>
    </div>
  );
}
