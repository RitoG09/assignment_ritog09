interface MarksCounterProps {
  totalQuestions: number;
  totalMarks: number;
}

export function MarksCounter({ totalQuestions, totalMarks }: MarksCounterProps) {
  return (
    <div className="mt-8 flex flex-col items-end gap-1">
      <p className="text-[16px] font-medium text-[#2A2A2A] lg:text-[17px]">
        Total Questions : {totalQuestions}
      </p>

      <p className="text-[16px] font-medium text-[#2A2A2A] lg:text-[17px]">
        Total Marks : {totalMarks}
      </p>
    </div>
  );
}
