"use client";

import { useEffect, useState } from "react";
import { getAssignmentById } from "@/lib/api/assignments";
import { interval } from "date-fns";

export const useAssignmentPolling = (assignmentId: string | null) => {
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  //poling logic
  useEffect(() => {
    if (!assignmentId) return;
    // poll fetchAssignment() every 3 sec until completed or failed
    const interval = setInterval(async () => {
      const latest = await fetchAssignment();
      if (latest?.status === "completed" || latest?.status === "failed")
        clearInterval(interval);
    }, 3000);
    return () => clearInterval(interval);
  }, [assignmentId]);

  return {
    assignment,
    loading,
    error,
  };
};
