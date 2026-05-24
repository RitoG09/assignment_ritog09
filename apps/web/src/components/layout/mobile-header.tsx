"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";

export function MobileHeader() {
  return (
    <header className="flex lg:hidden items-center justify-between h-[56px] px-4 bg-surface sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-brand flex items-center justify-center flex-shrink-0">
          <svg
            width="17"
            height="17"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L2 5v8l7 4 7-4V5L9 1z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M9 1L2 5l7 4 7-4-7-4z"
              fill="white"
            />
          </svg>
        </div>
        <span className="text-[16px] font-bold text-foreground tracking-tight">
          VedaAI
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notification Bell */}
        <button
          className="relative flex items-center justify-center w-[38px] h-[38px] rounded-full hover:bg-surface-hover transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-[20px] h-[20px] text-foreground" strokeWidth={1.8} />
        </button>

        {/* Avatar */}
        <div className="w-[34px] h-[34px] rounded-full bg-brand-light/30 flex items-center justify-center overflow-hidden ml-1">
          <Image
            src="/avatar-user.png"
            alt="User avatar"
            width={34}
            height={34}
            className="rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML =
                '<span class="text-xs font-semibold text-brand">JD</span>';
            }}
          />
        </div>

        {/* Hamburger */}
        <button
          className="flex items-center justify-center w-[38px] h-[38px] rounded-full hover:bg-surface-hover transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-[22px] h-[22px] text-foreground" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
