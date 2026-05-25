import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
// import testRoute from "./routes/test.route";
import assignmentRoutes from "./modules/assignment/assignment.route";
import socketRoutes from "./modules/socket/socket.route";

export const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://assignment-ritog09-web-uuyb.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);


app.use(express.json());

app.use("/pdfs", express.static(path.resolve(__dirname, "../../worker/pdfs")));

app.use("/api/assignments", assignmentRoutes);
app.use("/api/socket", socketRoutes);
// app.use("/test", testRoute);
