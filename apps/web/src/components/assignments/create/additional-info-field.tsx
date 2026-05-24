import { Mic } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { AssignmentFormValues } from "./schemas";

interface AdditionalInfoFieldProps {
  register: UseFormRegister<AssignmentFormValues>;
}

export function AdditionalInfoField({ register }: AdditionalInfoFieldProps) {
  return (
    <div className="mt-8">
      <label className="text-[17px] font-semibold text-[#232323] lg:text-[18px]">
        Additional Information (For better output)
      </label>

      <div className="relative mt-2.5">
        <textarea
          {...register("additionalInfo")}
          placeholder="e.g Generate a question paper for 3 hour exam duration..."
          className="min-h-[150px] w-full resize-none rounded-[24px] border border-dashed border-[#D5D5D5] bg-white p-5 pr-14 text-[15px] text-[#2A2A2A] outline-none placeholder:text-[#B0B0B0] lg:min-h-[160px] lg:rounded-[28px] lg:p-6 lg:text-[16px]"
        />

        <button
          type="button"
          aria-label="Voice input"
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F3F3] text-[#2A2A2A] transition-colors hover:bg-[#EAEAEA] lg:bottom-5 lg:right-5"
        >
          <Mic className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
