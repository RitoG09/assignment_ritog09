import { Router } from "express";
import { questionQueue } from "@repo/queue";

const router: Router = Router();

router.get("/", async (_, res) => {
  const job = await questionQueue.add("generate-question-paper", {
    topic: "Photosynthesis",
    difficulty: "medium",
  });
  res.json({
    success: true,
    jobId: job.id,
  });
});

export default router;
