export function AssignmentHeader() {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 h-[22px] w-[22px] shrink-0 rounded-full bg-[#65D48B] shadow-[0_0_0_6px_rgba(101,212,139,0.15)]" />

      <div>
        <h1 className="text-[38px] font-bold leading-none tracking-[-0.05em] text-[#222222]">
          Create Assignment
        </h1>

        <p className="mt-3 text-[18px] tracking-[-0.02em] text-[#979797]">
          Set up a new assignment for your students
        </p>
      </div>
    </div>
  );
}
