import { Minus, Plus } from "lucide-react";

interface StepperProps {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export function Stepper({
  label,
  value,
  onDecrement,
  onIncrement,
}: StepperProps) {
  return (
    <div>
      <p className="mb-1.5 text-[13px] font-medium text-[#8A8A8A] lg:hidden">
        {label}
      </p>

      <div className="flex h-[56px] items-center justify-between rounded-full border border-[#ECECEC] bg-white px-3 lg:h-[58px] lg:px-4">
        <button
          type="button"
          onClick={onDecrement}
          aria-label={`Decrease ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#2A2A2A] transition-colors hover:bg-[#F5F5F5]"
        >
          <Minus className="h-[18px] w-[18px]" />
        </button>

        <span className="min-w-[24px] text-center text-[18px] font-semibold text-[#2A2A2A]">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrement}
          aria-label={`Increase ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#2A2A2A] transition-colors hover:bg-[#F5F5F5]"
        >
          <Plus className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
