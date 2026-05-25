"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Filter, Plus } from "lucide-react";
import { getAllAssignments } from "@/lib/api/assignments";
import { AssignmentCard } from "./assignment-card";
import { AssignmentsEmptyState } from "./empty-state";

function AssignmentCardSkeleton() {
  return (
    <div className="relative rounded-[34px] bg-[#FAFAFA] border border-[#ECECEC] p-7 min-h-[205px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] animate-pulse">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="h-[28px] w-2/3 bg-gray-200 rounded-lg" />
        <div className="w-9 h-9 rounded-full bg-gray-200" />
      </div>

      {/* Bottom */}
      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between">
        <div className="h-5 w-1/3 bg-gray-200 rounded-md" />
        <div className="h-5 w-1/4 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}

export function AssignmentsGrid() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search string input to prevent overloading server queries
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let active = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await getAllAssignments(debouncedSearch);
        if (active) {
          if (data.success && Array.isArray(data.assignments)) {
            setAssignments(data.assignments);
          } else {
            setError("Invalid server response format");
          }
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load assignments");
          setLoading(false);
        }
      }
    };
    fetchAll();
    return () => {
      active = false;
    };
  }, [debouncedSearch]);

  const formatAssignmentDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd-MM-yyyy");
    } catch (e) {
      return "N/A";
    }
  };

  const filteredAssignments = assignments;

  if (loading) {
    return (
      <main className="flex-1 flex flex-col pt-6">
        {/* Header */}
        <div className="flex items-start gap-4 px-2">
          <div className="w-[22px] h-[22px] rounded-full bg-[#65D48B] mt-1 shadow-[0_0_0_6px_rgba(101,212,139,0.15)] animate-pulse" />
          <div>
            <h1 className="text-[38px] leading-none font-bold tracking-[-0.05em] text-[#222222]">
              Assignments
            </h1>
            <p className="mt-3 text-[18px] text-[#979797] tracking-[-0.02em]">
              Loading your assignments...
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex items-center justify-between gap-5 h-[82px] rounded-[32px] border border-[#ECECEC] bg-[#FAFAFA] px-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] animate-pulse">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-[54px] w-[420px] rounded-full bg-white border border-[#D8D8D8]" />
        </div>

        {/* Cards Skeleton Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <AssignmentCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex flex-col pt-6 items-center justify-center text-center py-20">
        <div className="p-8 max-w-md rounded-[34px] bg-[#FFF1F1] border border-[#FFE2E2] text-[#EF4444] shadow-[0_10px_30px_rgba(239,68,68,0.05)]">
          <h2 className="text-[22px] font-bold tracking-[-0.03em] mb-3 text-[#B91C1C]">
            Failed to Load Assignments
          </h2>
          <p className="text-[16px] font-medium mb-6 text-[#DC2626] leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="h-[52px] px-8 bg-[#EF4444] text-white font-semibold rounded-full hover:bg-[#DC2626] active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(239,68,68,0.2)] cursor-pointer"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (assignments.length === 0 && !debouncedSearch) {
    return <AssignmentsEmptyState />;
  }


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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-[18px] font-medium placeholder:text-[#A0A0A0]"
          />
        </div>
      </div>

      {/* Cards */}
      {filteredAssignments.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center py-10">
          <p className="text-[20px] font-semibold text-[#666666]">
            No assignments match "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 text-[16px] font-bold text-[#151515] hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              id={assignment._id}
              title={assignment.title || "Untitled Assignment"}
              assignedDate={formatAssignmentDate(assignment.createdAt)}
              dueDate={formatAssignmentDate(assignment.dueDate)}
              onDelete={() => {
                setAssignments((prev) => prev.filter((a) => a._id !== assignment._id));
              }}
            />
          ))}
        </div>


      )}

      {/* Floating CTA */}
      {/* Bottom Blur Area */}
      <div className="sticky bottom-0 z-40 pt-16 pb-6">
        {/* Blur Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-[#F4F4F4] via-[#F4F4F4]/80 to-transparent backdrop-blur-[3px] pointer-events-none" />

        {/* Button */}
        <div className="relative flex justify-center">
          <Link
            href="/assignments/create"
            className="h-[66px] px-9 rounded-full bg-[#151515] text-white flex items-center gap-3 text-[20px] font-semibold tracking-[-0.03em] shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:bg-black transition-all active:scale-[0.98] cursor-pointer inline-flex justify-center items-center"
          >
            <Plus className="w-[24px] h-[24px]" strokeWidth={2.5} />
            Create Assignment
          </Link>
        </div>
      </div>
    </main>
  );
}

