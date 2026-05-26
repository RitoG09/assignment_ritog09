interface QuestionRowProps {
  index: number;
  question: {
    question: string;
    marks: number;
    difficulty: string;
    options?: string[];
    answer?: string;
  };
  showAnswers?: boolean;
}

export function QuestionRow({ index, question, showAnswers }: QuestionRowProps) {
  return (
    <div className="flex flex-col gap-4 text-[20px] leading-[1.8] text-[#2A2A2A] border-b border-[#F2F2F2] pb-6 mt-4">
      {/* Question Title & Marks */}
      <div className="flex gap-3.5 items-start">
        <span className="font-bold text-[#FF5A1F] text-[22px] mt-0.5">{index + 1}.</span>
        <div className="flex-1">
          <p className="font-medium text-[#2C2C2C] text-[21px]">
            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-[#EAEAEA] text-[#555555] mr-3 tracking-wider align-middle select-none">
              {question.difficulty}
            </span>
            {question.question}
            <span className="text-[17px] font-bold text-[#8C8C8C] ml-3 select-none">
              ({question.marks} Marks)
            </span>
          </p>
        </div>
      </div>

      {/* MCQ Options Choices List */}
      {question.options && question.options.length > 0 && (
        <div className="pl-9 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {question.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isCorrect = showAnswers && question.answer === option;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl border transition-all ${
                  isCorrect
                    ? "border-[#10B981] bg-[#ECFDF5] text-[#065F46] font-semibold shadow-[0_4px_12px_rgba(16,185,129,0.06)]"
                    : "border-[#ECECEC] bg-[#FCFCFC] hover:border-[#D1D1D1] hover:bg-white"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-[14px] font-bold transition-colors select-none ${
                    isCorrect
                      ? "bg-[#10B981] text-white"
                      : "bg-[#EAEAEA] text-[#5A5A5A]"
                  }`}
                >
                  {letter}
                </span>
                <span className="text-[18px]">{option}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Model Answer (Non-MCQ questions) */}
      {showAnswers && question.answer && (!question.options || question.options.length === 0) && (
        <div className="pl-9 mt-2">
          <div className="bg-[#FFF9F6] border border-[#FFE8DE] rounded-2xl p-5 shadow-[0_4px_12px_rgba(255,90,31,0.02)]">
            <span className="font-extrabold text-[#FF5A1F] text-xs uppercase tracking-wider block mb-2 select-none">
              Model Answer
            </span>
            <p className="text-[#3A3A3A] font-medium text-[18px] leading-[1.65]">
              {question.answer}
            </p>
          </div>
        </div>
      )}

      {/* Correct Choice label (MCQ questions) */}
      {showAnswers && question.answer && question.options && question.options.length > 0 && (
        <div className="pl-9 mt-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          <p className="text-[16px] font-bold text-[#10B981] select-none">
            Correct Choice: {question.answer}
          </p>
        </div>
      )}
    </div>
  );
}
