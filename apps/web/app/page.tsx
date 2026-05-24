"use client"; // Make sure it runs on the client side

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Connected to server via WebSocket!", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>this is socket connection</div>
    </>
  );
}
