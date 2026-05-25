import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
// import testRoute from "./routes/test.route";
import assignmentRoutes from "./modules/assignment/assignment.route";
import socketRoutes from "./modules/socket/socket.route";

export const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://assignment-ritog09-web-uuyb.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(helmet());


app.use(express.json());

app.use("/pdfs", express.static(path.resolve(__dirname, "../../worker/pdfs")));

app.use("/api/assignments", assignmentRoutes);
app.use("/api/socket", socketRoutes);
// app.use("/test", testRoute);
