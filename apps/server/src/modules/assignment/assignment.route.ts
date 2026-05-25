import { Router } from "express";
import { upload } from "./multer";
import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByIdController,
} from "./assignment.controller";

const router: Router = Router();

router.get("/", getAllAssignmentsController);
router.get("/:id", getAssignmentByIdController);
router.post("/", upload.single("file"), createAssignmentController);

export default router;
