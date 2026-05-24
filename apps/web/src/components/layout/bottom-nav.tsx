"use client";

import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  ClipboardList,
  BookOpen,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const bottomNavItems: BottomNavItem[] = [
  { label: "Home", href: "/home", icon: LayoutGrid },
  { label: "Assignments", href: "/assignments", icon: ClipboardList },
  { label: "Library", href: "/library", icon: BookOpen },
  { label: "AI Toolkit", href: "/ai-toolkit", icon: Cpu },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex lg:hidden items-stretch justify-around bg-[#1c1c1e] fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] pb-[env(safe-area-inset-bottom)]" style={{ height: 68 }}>
      {bottomNavItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-[5px] flex-1 transition-colors",
              isActive
                ? "text-white"
                : "text-white/45"
            )}
          >
            <Icon
              className="w-[21px] h-[21px]"
              strokeWidth={isActive ? 2.2 : 1.6}
              fill={isActive ? "currentColor" : "none"}
            />
            <span
              className={cn(
                "text-[10px] leading-none tracking-wide",
                isActive ? "font-semibold" : "font-medium"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
