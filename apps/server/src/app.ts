import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
// import testRoute from "./routes/test.route";
import assignmentRoutes from "./modules/assignment/assignment.route";

export const app: Application = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/api/assignments", assignmentRoutes);
// app.use("/test", testRoute);
