import { ArrowLeft, ArrowRight } from "lucide-react";

export function AssignmentFooterActions() {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <button
        type="button"
        className="flex h-[54px] items-center gap-2.5 rounded-full border border-[#E5E5E5] bg-white px-6 text-[17px] font-medium text-[#2A2A2A] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#FAFAFA] lg:h-[58px] lg:px-8 lg:text-[18px]"
      >
        <ArrowLeft className="h-5 w-5" />
        Previous
      </button>

      <button
        type="button"
        className="flex h-[54px] items-center gap-2.5 rounded-full bg-[#151515] px-7 text-[17px] font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-colors hover:bg-black lg:h-[58px] lg:px-9 lg:text-[18px]"
      >
        Next
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
