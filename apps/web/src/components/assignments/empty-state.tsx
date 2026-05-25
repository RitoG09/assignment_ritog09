"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AssignmentsEmptyState() {
  return (
    <main className="flex-1 flex items-center justify-center px-8 py-10">
      <div className="flex flex-col items-center text-center max-w-[560px] -mt-10">
        {/* Illustration */}
        <div className="relative w-[360px] h-[300px] mb-6">
          <Image
            src="/not.png"
            alt="No assignments"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-[24px] leading-none font-bold tracking-[-0.03em] text-[#222222]">
          No assignments yet
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-[620px] text-[16px] leading-[1.7] font-medium text-[#8A8A8A] tracking-[-0.02em]">
          Create your first assignment to start collecting and grading student
          submissions. You can set up rubrics, define marking criteria, and let
          AI assist with grading.
        </p>

        {/* CTA */}
        <Link
          href="/assignments/create"
          className="mt-10 inline-flex items-center justify-center gap-3 h-[56px] px-8 rounded-full bg-[#171717] text-white text-[18px] font-semibold tracking-[-0.02em] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:bg-black active:scale-[0.98]"
        >
          <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />

          <span>Create Your First Assignment</span>
        </Link>
      </div>
    </main>
  );
}

