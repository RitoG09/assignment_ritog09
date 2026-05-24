"use client";

import { MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AssignmentCardProps {
  title: string;
  assignedDate: string;
  dueDate: string;
}

export function AssignmentCard({
  title,
  assignedDate,
  dueDate,
}: AssignmentCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-[34px] bg-[#FAFAFA] border border-[#ECECEC] p-7 min-h-[205px] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      {/* Top */}
      <div className="flex items-start justify-between">
        <h2 className="text-[22px] font-bold tracking-[-0.04em] text-[#222222] underline underline-offset-2">
          {title}
        </h2>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#F3F3F3] transition-colors"
        >
          <MoreVertical
            className="w-[20px] h-[20px] text-[#9B9B9B]"
            strokeWidth={2.3}
          />
        </button>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[16px] font-bold text-[#2A2A2A]">
            Assigned on :
          </span>

          <span className="text-[16px] font-medium text-[#7C7C7C]">
            {assignedDate}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[16px] font-bold text-[#2A2A2A]">Due :</span>

          <span className="text-[16px] font-medium text-[#7C7C7C]">
            {dueDate}
          </span>
        </div>
      </div>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-[72px] right-10 w-[190px] rounded-[24px] bg-white border border-[#ECECEC] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-200 z-20",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2",
        )}
      >
        <button className="flex items-center gap-3 w-full h-[48px] px-4 rounded-2xl text-[17px] font-medium text-[#262626] hover:bg-[#F5F5F5] transition-colors">
          <Eye className="w-[18px] h-[18px]" />
          View Assignment
        </button>

        <button className="flex items-center gap-3 w-full h-[48px] px-4 rounded-2xl text-[17px] font-medium text-[#EF4444] hover:bg-[#FFF1F1] transition-colors">
          <Trash2 className="w-[18px] h-[18px]" />
          Delete
        </button>
      </div>
    </div>
  );
}
