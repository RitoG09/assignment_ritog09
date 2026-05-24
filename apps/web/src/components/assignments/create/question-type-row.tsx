import { ChevronDown, X } from "lucide-react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { QUESTION_TYPE_OPTIONS, type QuestionTypeOption } from "./constants";
import type { AssignmentFormValues } from "./schemas";
import { Stepper } from "./stepper";

interface QuestionTypeRowProps {
  index: number;
  fieldId: string;
  row: AssignmentFormValues["questionTypes"][number] | undefined;
  register: UseFormRegister<AssignmentFormValues>;
  setValue: UseFormSetValue<AssignmentFormValues>;
  onRemove: () => void;
}

export function QuestionTypeRow({
  index,
  fieldId,
  row,
  register,
  setValue,
  onRemove,
}: QuestionTypeRowProps) {
  const questions = row?.questions ?? 1;
  const marks = row?.marks ?? 1;

  return (
    <div
      key={fieldId}
      className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_36px_148px_148px] lg:items-center lg:gap-4"
    >
      <div className="flex items-center gap-3 lg:contents">
        <div className="relative min-w-0 flex-1 lg:flex-none">
          <select
            {...register(`questionTypes.${index}.type`)}
            className="h-[56px] w-full appearance-none rounded-full border border-[#ECECEC] bg-white px-5 pr-11 text-[15px] font-medium text-[#2A2A2A] outline-none lg:h-[58px] lg:px-6 lg:text-[16px]"
          >
            {QUESTION_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            {!QUESTION_TYPE_OPTIONS.includes(row?.type as QuestionTypeOption) &&
            row?.type ? (
              <option value={row.type}>{row.type}</option>
            ) : null}
          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B6B6B]" />
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove question type"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#6B6B6B] transition-colors hover:bg-[#F3F3F3] lg:h-9 lg:w-9"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      </div>

      <Stepper
        label="No. of Questions"
        value={questions}
        onDecrement={() =>
          setValue(
            `questionTypes.${index}.questions`,
            Math.max(1, questions - 1),
          )
        }
        onIncrement={() =>
          setValue(`questionTypes.${index}.questions`, questions + 1)
        }
      />

      <Stepper
        label="Marks"
        value={marks}
        onDecrement={() =>
          setValue(`questionTypes.${index}.marks`, Math.max(1, marks - 1))
        }
        onIncrement={() => setValue(`questionTypes.${index}.marks`, marks + 1)}
      />
    </div>
  );
}
