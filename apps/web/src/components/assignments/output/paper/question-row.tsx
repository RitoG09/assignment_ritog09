interface QuestionRowProps {
  index: number;
  question: {
    question: string;
    marks: number;
    difficulty: string;
  };
}

export function QuestionRow({ index, question }: QuestionRowProps) {
  return (
    <div className="flex gap-3 text-[20px] leading-[1.8] text-[#2A2A2A]">
      <span className="font-medium">{index + 1}.</span>

      <p>
        <span className="font-medium">[{question.difficulty}]</span>{" "}
        {question.question} [{question.marks} Marks]
      </p>
    </div>
  );
}
