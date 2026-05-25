import { Router } from "express";
import { getIO } from "../../socket";

const router: Router = Router();

router.post("/emit", (req, res) => {
  const { room, event, data } = req.body;
  getIO().to(room).emit(event, data);

  return res.json({
    success: true,
  });
});

export default router;
