"use client";

import { Search, Filter, Plus } from "lucide-react";

import { AssignmentCard } from "./assignment-card";

const assignments = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: "Quiz on Electricity",
  assignedDate: "20-06-2025",
  dueDate: "21-06-2025",
}));

export function AssignmentsGrid() {
  return (
    <main className="flex-1 flex flex-col pt-6">
      {/* Header */}
      <div className="flex items-start gap-4 px-2">
        <div className="w-[22px] h-[22px] rounded-full bg-[#65D48B] mt-1 shadow-[0_0_0_6px_rgba(101,212,139,0.15)]" />

        <div>
          <h1 className="text-[38px] leading-none font-bold tracking-[-0.05em] text-[#222222]">
            Assignments
          </h1>

          <p className="mt-3 text-[18px] text-[#979797] tracking-[-0.02em]">
            Manage and create assignments for your classes.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex items-center justify-between gap-5 h-[82px] rounded-[32px] border border-[#ECECEC] bg-[#FAFAFA] px-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Filter */}
        <button className="flex items-center gap-3 text-[#9A9A9A] hover:text-[#222222] transition-colors">
          <Filter className="w-[20px] h-[20px]" strokeWidth={2.2} />

          <span className="text-[20px] font-semibold tracking-[-0.03em]">
            Filter By
          </span>
        </button>

        {/* Search */}
        <div className="flex items-center gap-3 w-[420px] h-[54px] rounded-full border border-[#D8D8D8] bg-white px-5">
          <Search
            className="w-[20px] h-[20px] text-[#A0A0A0]"
            strokeWidth={2.2}
          />

          <input
            placeholder="Search Assignment"
            className="flex-1 bg-transparent outline-none border-none text-[18px] font-medium placeholder:text-[#A0A0A0]"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-2 gap-5 pb-10">
        {assignments.map((assignment, i) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.title}
            assignedDate={assignment.assignedDate}
            dueDate={assignment.dueDate}
          />
        ))}
      </div>

      {/* Floating CTA */}
      {/* Bottom Blur Area */}
      <div className="sticky bottom-0 z-40 pt-16 pb-6">
        {/* Blur Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-[#F4F4F4] via-[#F4F4F4]/80 to-transparent backdrop-blur-[3px] pointer-events-none" />

        {/* Button */}
        <div className="relative flex justify-center">
          <button className="h-[66px] px-9 rounded-full bg-[#151515] text-white flex items-center gap-3 text-[20px] font-semibold tracking-[-0.03em] shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:bg-black transition-all active:scale-[0.98]">
            <Plus className="w-[24px] h-[24px]" strokeWidth={2.5} />
            Create Assignment
          </button>
        </div>
      </div>
    </main>
  );
}
