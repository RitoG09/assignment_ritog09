import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { app } from "./app";
import { connectMongo } from "@repo/database";
import { initSocket } from "./socket";


const PORT = process.env.PORT || 8000;

async function bootstrap() {
  await connectMongo();

  const server = http.createServer(app);
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

bootstrap();
