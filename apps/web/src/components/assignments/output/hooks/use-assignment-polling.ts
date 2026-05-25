"use client";

import { useEffect, useState } from "react";
import { getAssignmentById } from "@/lib/api/assignments";
import { socket } from "@/lib/socket";
import { useNotificationStore } from "@/store/notification.store";
import toast from "react-hot-toast";

export const useAssignmentPolling = (assignmentId: string | null) => {
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  // fetching assginment by id
  const fetchAssignment = async () => {
    if (!assignmentId) return null;

    try {
      const response = await getAssignmentById(assignmentId);
      setAssignment(response.assignment);
      setLoading(false);
      return response.assignment;
    } catch (error) {
      setError("Failed to fetch assignment");
      setLoading(false);
      return null;
    }
  };
  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]);

  // join socket room
  useEffect(() => {
    if (!assignmentId) return;

    socket.emit("join-assignment", assignmentId);
  }, [assignmentId]);

  // socket listeners
  useEffect(() => {
    socket.on("generation-progress", (data) => {
      addNotification(data.step);
      setAssignment((prev: any) => ({
        ...prev,
        step: data.step,
      }));
    });

    socket.on("generation-completed", async (data) => {
      const response = await getAssignmentById(assignmentId!);
      setAssignment(response.assignment);
      toast.success(data.message || "Questions created");
      addNotification("Assignment completed");
      setLoading(false);
    });

    socket.on("generation-failed", (data) => {
      setError(data.error || "Generation failed");
      toast.error(data.error || "Generation failed");
      addNotification("Assignment creation failed");
      setLoading(false);
    });

    return () => {
      socket.off("generation-progress");
      socket.off("generation-completed");
      socket.off("generation-failed");
    };
  }, [assignmentId]);

  // //poling logic (TEMP fallback polling)
  // useEffect(() => {
  //   if (!assignmentId) return;
  //   // poll fetchAssignment() every 3 sec until completed or failed
  //   const interval = setInterval(async () => {
  //     const latest = await fetchAssignment();
  //     if (latest?.status === "completed" || latest?.status === "failed")
  //       clearInterval(interval);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [assignmentId]);

  return {
    assignment,
    loading,
    error,
  };
};
