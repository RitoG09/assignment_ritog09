"use client";

import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Users,
  ClipboardList,
  BookOpen,
  PieChart,
  Settings,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/home", icon: LayoutGrid },
  { label: "My Groups", href: "/groups", icon: Users },
  { label: "Assignments", href: "/assignments", icon: ClipboardList },
  { label: "AI Teacher's Toolkit", href: "/ai-toolkit", icon: BookOpen },
  { label: "My Library", href: "/library", icon: PieChart },
];

function NavLink({
  item,
  isActive,
  badge,
}: {
  item: NavItem;
  isActive: boolean;
  badge?: string;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-4 h-[52px] px-4 rounded-2xl transition-all duration-200",
        isActive
          ? "bg-gray-200 text-black"
          : "text-[#8A8A8A] hover:bg-gray-100 hover:text-black",
      )}
    >
      <Icon
        className={cn(
          "w-[21px] h-[21px] flex-shrink-0 transition-colors",
          isActive ? "text-black stroke-[2.2]" : "text-[#8A8A8A] stroke-[1.9]",
        )}
      />

      <span
        className={cn(
          "text-[18px] tracking-[-0.02em] transition-colors",
          isActive
            ? "font-semibold text-black"
            : "font-medium text-[#8A8A8A] group-hover:text-black",
        )}
      >
        {item.label}
      </span>

      {badge ? (
        <span className="ml-auto flex h-[28px] min-w-[28px] items-center justify-center rounded-full bg-[#FF5A1F] px-2 text-[13px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col justify-between w-[340px] h-[calc(100vh-24px)] m-3 rounded-[28px] border border-[#EAEAEA] bg-[#FAFAFA] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.05)]">
      {/* TOP */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/assignments"
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
          >
            {/* Logo */}
            <div
              className="w-[40px] h-[40px] rounded-[14px] flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(145deg, #FF8B3D 0%, #C55A11 45%, #7A2600 100%)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3.5L8 13L13 3.5H10.2L8 8.2L5.8 3.5H3Z"
                  fill="white"
                />
              </svg>
            </div>

            <h1 className="text-[27px] font-bold tracking-[-0.03em] text-[#111111]">
              VedaAI
            </h1>
          </Link>
        </div>


        {/* CTA */}
        <div
          className="mt-8 p-[5px] rounded-full"
          style={{
            background:
              "linear-gradient(145deg, #FF8B3D 0%, #C55A11 45%, #7A2600 100%)",
          }}
        >
          <Link
            href="/assignments/create"
            className="w-full h-[58px] rounded-full bg-[#171717] text-white flex items-center justify-center gap-3 text-[17px] font-semibold tracking-[-0.02em] transition-all hover:bg-black px-5"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4" strokeWidth={2.2} />

              <Sparkles
                className="w-3 h-3 absolute -top-1 -right-2 opacity-80"
                strokeWidth={2.2}
              />
            </div>

            <span>Create Assignment</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="mt-10 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive}
                badge={item.label === "My Library" ? "32" : undefined}
              />
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-5 pb-2">
        {/* Settings */}
        <Link
          href="/settings"
          className="flex items-center gap-4 px-4 text-[#6F6F6F] hover:text-[#111111] transition-colors"
        >
          <Settings className="w-[22px] h-[22px] stroke-[1.9]" />

          <span className="text-[18px] font-medium tracking-[-0.02em]">
            Settings
          </span>
        </Link>

        {/* School Card */}
        <div className="flex items-center gap-4 rounded-3xl bg-gray-200 px-4 py-4 mx-1">
          <div className="w-[56px] h-[56px] rounded-full overflow-hidden shrink-0">
            <Image
              src="/avatar-monkey.png"
              alt="School avatar"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 rounded-xs">
            <p className="text-[18px] font-semibold leading-tight tracking-[-0.03em] text-[#161616] truncate">
              Delhi Public School
            </p>

            <p className="mt-1 text-[15px] text-[#7A7A7A] leading-none truncate">
              Bokaro Steel City
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
