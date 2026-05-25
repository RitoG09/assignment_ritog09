import type { UseFormRegister } from "react-hook-form";
import type { AssignmentFormValues } from "./schemas";

interface TitleFieldProps {
  register: UseFormRegister<AssignmentFormValues>;
  error?: string;
}

export function TitleField({ register, error }: TitleFieldProps) {
  return (
    <div className="mt-8">
      <label className="text-[17px] font-semibold text-[#232323] lg:text-[18px] flex items-center gap-1">
        Assignment Title <span className="text-[#FF5A1F]">*</span>
      </label>

      <div className="relative mt-2.5">
        <input
          {...register("title")}
          placeholder="e.g. Midterm Quiz on Physics"
          className="flex h-[58px] w-full items-center rounded-full border border-[#E2E2E2] bg-white px-6 text-[15px] text-[#2A2A2A] outline-none transition-colors hover:border-[#CFCFCF] focus:border-[#FF5A1F] lg:h-[62px] lg:px-7 lg:text-[16px]"
        />
        {error && (
          <p className="mt-2 text-sm font-semibold text-[#EF4444] px-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
