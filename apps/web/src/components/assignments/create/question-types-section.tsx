import { Plus } from "lucide-react";
import type {
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { AssignmentFormValues } from "./schemas";
import { MarksCounter } from "./marks-counter";
import { QuestionTypeRow } from "./question-type-row";

interface QuestionTypesSectionProps {
  fields: FieldArrayWithId<AssignmentFormValues, "questionTypes", "id">[];
  questionTypes: AssignmentFormValues["questionTypes"];
  totalQuestions: number;
  totalMarks: number;
  register: UseFormRegister<AssignmentFormValues>;
  setValue: UseFormSetValue<AssignmentFormValues>;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function QuestionTypesSection({
  fields,
  questionTypes,
  totalQuestions,
  totalMarks,
  register,
  setValue,
  onAdd,
  onRemove,
}: QuestionTypesSectionProps) {
  return (
    <div className="mt-8">
      <div className="hidden gap-4 px-1 lg:grid lg:grid-cols-[minmax(0,1fr)_36px_148px_148px]">
        <h3 className="text-[17px] font-semibold text-[#222222]">
          Question Type
        </h3>
        <span />
        <h3 className="text-center text-[17px] font-semibold text-[#222222]">
          No. of Questions
        </h3>
        <h3 className="text-center text-[17px] font-semibold text-[#222222]">
          Marks
        </h3>
      </div>

      <div className="mt-4 space-y-4">
        {fields.map((field, index) => (
          <QuestionTypeRow
            key={field.id}
            index={index}
            fieldId={field.id}
            row={questionTypes[index]}
            register={register}
            setValue={setValue}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 flex items-center gap-3"
      >
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#202020] text-white">
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </div>

        <span className="text-[16px] font-semibold text-[#2A2A2A] lg:text-[17px]">
          Add Question Type
        </span>
      </button>

      <MarksCounter
        totalQuestions={totalQuestions}
        totalMarks={totalMarks}
      />
    </div>
  );
}
