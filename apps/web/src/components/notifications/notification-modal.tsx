"use client";

import { useNotificationStore } from "@/store/notification.store";
import {
  BellOff,
  CheckCircle2,
  XCircle,
  Loader2,
  Trash2,
  Bell,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function NotificationModal() {
  const notifications = useNotificationStore((state) => state.notifications);
  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications,
  );

  const getNotificationStyle = (message?: string) => {
    const msgLower = (message || "").toLowerCase();

    if (
      msgLower.includes("completed") ||
      msgLower.includes("success") ||
      msgLower.includes("created") ||
      msgLower.includes("done") ||
      msgLower.includes("chunking") ||
      msgLower.includes("generating") ||
      msgLower.includes("structuring")
    ) {
      return {
        bg: "bg-[#F3FCF7] border-[#D1F2DE] hover:bg-[#EAFAF0]",
        icon: (
          <CheckCircle2
            className="w-[18px] h-[18px] text-[#2FB361]"
            strokeWidth={2.5}
          />
        ),
        textColor: "text-[#1B5E34]",
      };
    }

    if (msgLower.includes("failed") || msgLower.includes("error")) {
      return {
        bg: "bg-[#FFF5F5] border-[#FFD8D8] hover:bg-[#FFF0FF]",
        icon: (
          <XCircle
            className="w-[18px] h-[18px] text-[#EF4444]"
            strokeWidth={2.5}
          />
        ),
        textColor: "text-[#8E1E1E]",
      };
    }
    return {
      bg: "bg-[#FAFAFA] border-[#ECECEC] hover:bg-[#F5F5F5]",
      icon: (
        <Loader2
          className="w-[18px] h-[18px] text-[#C55A11] animate-spin"
          strokeWidth={2.5}
        />
      ),
      textColor: "text-[#222222]",
    };
  };

  const formatTimestamp = (timestamp: number) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <div className="absolute right-0 top-14 z-50 w-[380px] rounded-[28px] border border-[#ECECEC] bg-white/95 backdrop-blur-[12px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F0F0]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Bell
              className="w-[20px] h-[20px] text-[#222222]"
              strokeWidth={2.2}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF5A1F]" />
            )}
          </div>
          <h3 className="text-[18px] font-bold text-[#222222] tracking-[-0.02em]">
            Notifications
          </h3>
          {notifications.length > 0 && (
            <span className="flex h-5 items-center justify-center rounded-full bg-[#FF5A1F]/10 px-2 text-[12px] font-bold text-[#FF5A1F]">
              {notifications.length}
            </span>
          )}
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="flex items-center gap-1.5 text-[14px] font-bold text-[#FF5A1F] hover:text-[#C55A11] transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2.2} />
            Clear all
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-[64px] h-[64px] rounded-full bg-[#FAFAFA] border border-[#ECECEC] flex items-center justify-center mb-4 shadow-sm">
              <BellOff
                className="w-[24px] h-[24px] text-[#A0A0A0]"
                strokeWidth={2}
              />
            </div>
            <p className="text-[17px] font-bold text-[#222222] tracking-[-0.02em]">
              No new alerts
            </p>
            <p className="text-[14px] text-[#909090] mt-1 font-semibold max-w-[220px] leading-normal tracking-[-0.01em]">
              We'll let you know when assignment actions occur.
            </p>
          </div>
        ) : (
          <div className="max-h-[320px] overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin">
            {notifications.map((notification) => {
              const style = getNotificationStyle(notification.message);
              return (
                <div
                  key={notification.id}
                  className={`flex gap-3 rounded-[18px] border p-3.5 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] ${style.bg}`}
                >
                  <div className="shrink-0 mt-0.5">{style.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[14px] font-semibold leading-snug tracking-[-0.01em] ${style.textColor}`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-[11px] font-bold text-[#9E9E9E] mt-1 tracking-[-0.01em]">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
