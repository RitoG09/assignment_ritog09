import { Router } from "express";
import { upload } from "./multer";
import { createAssignmentController } from "./assignment.controller";

const router: Router = Router();
router.post("/", upload.single("file"), createAssignmentController);

export default router;
