import { api } from "./axios";

export const createAssignment = async (formData: FormData) => {
  const response = await api.post("/assignments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAssignmentById = async (id: string) => {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
};

export const getAllAssignments = async () => {
  const response = await api.get("/assignments");
  return response.data;
};
