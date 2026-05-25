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

export const getAllAssignments = async (search?: string) => {
  const response = await api.get("/assignments", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const deleteAssignment = async (id: string) => {
  const response = await api.delete(`/assignments/${id}`);
  return response.data;
};

export const exportPdf = async (id: string) => {
  const response = await api.post(`/assignments/${id}/export`);
  return response.data;
};
