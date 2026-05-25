import { Download } from "lucide-react";

export function OutputHeader() {
  return (
    <div className="rounded-[32px] bg-[#262626] px-8 py-7 text-white shadow-sm">
      <div className="max-w-4xl">
        <h2 className="text-[30px] font-semibold leading-[1.4] tracking-[-0.03em]">
          Certainly! Here are your customized AI generated question papers.
        </h2>

        <button className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black transition hover:bg-neutral-100">
          <Download className="h-4 w-4" />
          Download as PDF
        </button>
      </div>
    </div>
  );
}
