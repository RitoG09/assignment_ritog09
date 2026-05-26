import { QuestionRow } from "./question-row";

interface PaperSectionProps {
  section: {
    title: string;
    questions: any[];
  };
  showAnswers?: boolean;
}

export function PaperSection({ section, showAnswers }: PaperSectionProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-[38px] font-bold text-[#2A2A2A]">
          {section.title}
        </h2>
      </div>

      <div className="space-y-5">
        {section.questions.map((question, index) => (
          <QuestionRow
            key={index}
            index={index}
            question={question}
            showAnswers={showAnswers}
          />
        ))}
      </div>
    </div>
  );
}
