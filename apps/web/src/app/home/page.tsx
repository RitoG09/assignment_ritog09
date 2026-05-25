import { AppLayout } from "@/components/layout/app-layout";
import { Sparkles, LayoutGrid } from "lucide-react";

export default function HomePage() {
  return (
    <AppLayout pageTitle="Home">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[65vh] text-center px-6">
        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-tr from-[#FF8B3D] to-[#7A2600] flex items-center justify-center shadow-[0_12px_40px_rgba(197,90,17,0.25)] animate-pulse mb-8">
          <LayoutGrid className="w-9 h-9 text-white" strokeWidth={2} />
        </div>

        <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-[#222222] leading-none">
          Home Dashboard
        </h1>

        <p className="mt-4 max-w-md text-[17px] text-[#8A8A8A] leading-[1.6] font-medium tracking-[-0.01em]">
          Our team is currently polishing the central workspace. VedaAI is crafting a premium hub tailored for your classes.
        </p>

        <div className="mt-8 flex items-center gap-2.5 px-6 h-[46px] bg-[#EAEAEA] text-[#333] font-bold rounded-full text-[15px] tracking-[-0.01em] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <Sparkles className="w-4 h-4 text-[#C55A11]" strokeWidth={2.5} />
          <span>Coming Soon</span>
        </div>
      </div>
    </AppLayout>
  );
}
