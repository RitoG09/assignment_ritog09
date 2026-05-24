import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { MobileHeader } from "./mobile-header";
import { BottomNav } from "./bottom-nav";

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppLayout({
  children,
  pageTitle = "Assignment",
}: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F5F5]">
      {/* FIXED SIDEBAR */}
      <div className="shrink-0 h-screen">
        <Sidebar />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden lg:p-3 gap-3">
        {/* Mobile Header */}
        <MobileHeader />

        {/* FIXED TOPBAR */}
        <div className="shrink-0">
          <TopBar title={pageTitle} />
        </div>

        {/* SCROLLABLE CONTENT ONLY */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[68px] lg:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
