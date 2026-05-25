import { create } from "zustand";

interface Notification {
  id: string;
  message: string;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (message) =>
    set((state) => ({
      notifications: [
        {
          id: crypto.randomUUID(),
          message,
          timestamp: Date.now(),
        },
        ...state.notifications,
      ],
    })),

  clearNotifications: () => set({ notifications: [] }),
}));

