"use client";

import { useState } from "react";

import { Calendar as CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

import type { AssignmentFormValues } from "./schemas";

interface DueDateFieldProps {
  setValue: UseFormSetValue<AssignmentFormValues>;
  watch: UseFormWatch<AssignmentFormValues>;
}

export function DueDateField({ setValue, watch }: DueDateFieldProps) {
  const [open, setOpen] = useState(false);

  const dueDate = watch("dueDate");

  const selectedDate = dueDate ? new Date(dueDate) : undefined;

  return (
    <div className="mt-8">
      <label className="text-[17px] font-semibold text-[#232323] lg:text-[18px]">
        Due Date
      </label>

      <div className="relative mt-2.5">
        {/* Input */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-[58px] w-full items-center rounded-full border border-[#E2E2E2] bg-white px-6 pr-14 text-left text-[16px] text-[#2A2A2A] outline-none transition-colors hover:border-[#CFCFCF] lg:h-[62px] lg:px-7 lg:text-[17px]"
        >
          {dueDate ? (
            <span>{format(new Date(dueDate), "dd-MM-yyyy")}</span>
          ) : (
            <span className="text-[#B5B5B5]">DD-MM-YYYY</span>
          )}
        </button>

        {/* Icon */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-[#F3F3F3] lg:right-6"
        >
          <CalendarIcon className="h-[22px] w-[22px] text-[#2B2B2B] lg:h-[24px] lg:w-[24px]" />
        </button>

        {/* Calendar */}
        {open && (
          <div className="absolute left-0 top-[72px] z-50 rounded-[24px] border border-[#ECECEC] bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;

                setValue("dueDate", date.toISOString());

                setOpen(false);
              }}
              disabled={{
                before: new Date(),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
