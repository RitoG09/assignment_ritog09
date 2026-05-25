import axios from "axios";

export const emitSocketEvent = async ({
  assignmentId,
  event,
  data,
}: {
  assignmentId: string;
  event: string;
  data?: any;
}) => {
  try {
    await axios.post("http://localhost:8000/api/socket/emit", {
      room: `assignment:${assignmentId}`,
      event,
      data,
    });
  } catch (error) {
    console.error("Socket emit failed", error);
  }
};
