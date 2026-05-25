"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Bell, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NotificationModal } from "@/components/notifications/notification-modal";
import { useNotificationStore } from "@/store/notification.store";

interface TopBarProps {
  title?: string;
}

export function TopBar({ title = "Assignment" }: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useNotificationStore((state) => state.notifications);
  const hasNotifications = notifications.length > 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close notifications on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="hidden lg:flex items-center justify-between h-[72px] w-full rounded-[28px] border border-[#E9E9E9] bg-[#FAFAFA] px-7 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.05)]">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          aria-label="Go Back"
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-[#F1F1F1]"
        >
          <ArrowLeft
            className="w-[22px] h-[22px] text-[#222222]"
            strokeWidth={2.2}
          />
        </button>


        <div className="flex items-center gap-2">
          <Sparkles
            className="w-[16px] h-[16px] text-[#B0B0B0]"
            strokeWidth={2}
          />

          <span className="text-[16px] font-semibold tracking-[-0.02em] text-[#B0B0B0]">
            {title}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-[#F1F1F1]"
          >
            <Bell className="w-[22px] h-[22px] text-[#1A1A1A]" strokeWidth={2} />

            {hasNotifications && (
              <span className="absolute top-[7px] right-[7px] w-[8px] h-[8px] rounded-full bg-[#FF5A1F]" />
            )}
          </button>

          {isOpen && <NotificationModal />}
        </div>

        {/* User */}
        <button className="flex items-center gap-3 rounded-full px-1 py-1 transition-colors hover:bg-[#F3F3F3] active:scale-[0.98]">
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden bg-[#FFE1DA] flex items-center justify-center shrink-0">
            <Image
              src="/avatar-monkey.png"
              alt="User"
              width={42}
              height={42}
              className="block w-full h-full object-cover"
            />
          </div>

          <span className="text-[20px] font-semibold tracking-[-0.03em] text-[#222222]">
            John Doe
          </span>

          <ChevronDown
            className="w-[20px] h-[20px] text-[#444444]"
            strokeWidth={2.2}
          />
        </button>
      </div>
    </header>
  );
}

