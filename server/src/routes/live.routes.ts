// src/routes/live.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { scheduleLiveClass, getUpcoming } from "../controllers/live.controller.js";
import { isTeacherOrAdmin } from "../middleware/teacher.js";

const router = Router();

router.post("/schedule", authenticate, isTeacherOrAdmin, scheduleLiveClass);
router.get("/upcoming", authenticate, getUpcoming);

export default router;
