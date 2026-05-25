"use client";

import { MoreVertical, Eye, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteAssignment } from "@/lib/api/assignments";
import toast from "react-hot-toast";

interface AssignmentCardProps {
  id: string;
  title: string;
  assignedDate: string;
  dueDate: string;
  onDelete?: () => void;
}

export function AssignmentCard({
  id,
  title,
  assignedDate,
  dueDate,
  onDelete,
}: AssignmentCardProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/assignments/output?id=${id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleting) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?",
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const response = await deleteAssignment(id);
      if (response.success) {
        toast.success("Assignment deleted successfully");
        if (onDelete) onDelete();
      } else {
        toast.error("Failed to delete assignment");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the assignment");
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-[34px] bg-[#FAFAFA] border border-[#ECECEC] p-7 min-h-[205px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all",
        deleting && "opacity-50 pointer-events-none",
      )}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <h2
          onClick={handleNavigate}
          className="text-[22px] font-bold tracking-[-0.04em] text-[#222222] underline underline-offset-2 cursor-pointer hover:text-black transition-colors"
        >
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
      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-[72px] right-10 w-[240px] rounded-[24px] bg-white border border-[#ECECEC] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-200 z-20",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2",
        )}
      >
        <button
          onClick={handleNavigate}
          className="flex items-center gap-3 w-full h-[48px] px-4 rounded-2xl text-[16px] font-semibold text-[#262626] hover:bg-[#F5F5F5] transition-colors cursor-pointer whitespace-nowrap"
        >
          <Eye className="w-[20px] h-[20px]" />
          View Assignment
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-3 w-full h-[48px] px-4 rounded-2xl text-[16px] font-semibold text-[#EF4444] hover:bg-[#FFF1F1] transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          {deleting ? (
            <Loader2 className="w-[18px] h-[18px] animate-spin" />
          ) : (
            <Trash2 className="w-[18px] h-[18px]" />
          )}
          Delete
        </button>
      </div>

    </div>
  );
}


