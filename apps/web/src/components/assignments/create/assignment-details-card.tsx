import type { ReactNode } from "react";

interface AssignmentDetailsCardProps {
  children: ReactNode;
}

export function AssignmentDetailsCard({ children }: AssignmentDetailsCardProps) {
  return (
    <div className="mt-6 rounded-[32px] border border-[#EBEBEB] bg-white p-6 shadow-[0_4px_28px_rgba(0,0,0,0.06)] lg:rounded-[36px] lg:p-8">
      <div>
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[#1E1E1E] lg:text-[32px]">
          Assignment Details
        </h2>

        <p className="mt-1 text-[15px] text-[#8D8D8D] lg:text-[16px]">
          Basic information about your assignment
        </p>
      </div>

      {children}
    </div>
  );
}
