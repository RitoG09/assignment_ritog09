import { Router } from "express";
import { upload } from "./multer";
import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByIdController,
  deleteAssignmentController,
  exportPdfController,
} from "./assignment.controller";

const router: Router = Router();

router.get("/", getAllAssignmentsController);
router.get("/:id", getAssignmentByIdController);
router.post("/", upload.single("file"), createAssignmentController);
router.post("/:id/export", exportPdfController);
router.delete("/:id", deleteAssignmentController);

export default router;
