"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";

export function MobileHeader() {
  return (
    <header className="flex lg:hidden items-center justify-between h-[56px] px-4 bg-surface sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-[34px] h-[34px] rounded-[11px] flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(145deg, #FF8B3D 0%, #C55A11 45%, #7A2600 100%)",
          }}
        >
          <svg
            width="15"
            height="15"
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
          <Bell
            className="w-[20px] h-[20px] text-foreground"
            strokeWidth={1.8}
          />
        </button>

        {/* Avatar */}
        <div className="w-[34px] h-[34px] rounded-full overflow-hidden ml-1 bg-[#FFE1DA] flex items-center justify-center shrink-0">
          <Image
            src="/avatar-monkey.png"
            alt="User avatar"
            width={34}
            height={34}
            className="block w-full h-full object-cover"
          />
        </div>


        {/* Hamburger */}
        <button
          className="flex items-center justify-center w-[38px] h-[38px] rounded-full hover:bg-surface-hover transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu
            className="w-[22px] h-[22px] text-foreground"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </header>
  );
}
