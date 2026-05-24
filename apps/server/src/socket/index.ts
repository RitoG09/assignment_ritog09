import { Server } from "socket.io";

export let io: Server;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
  });
}
