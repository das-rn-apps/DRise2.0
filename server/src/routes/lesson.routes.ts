// src/routes/lesson.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createLesson, updateLesson, deleteLesson } from "../controllers/lesson.controller.js";
import { isTeacherOrAdmin } from "../middleware/teacher.js";

const router = Router();

router.post("/", authenticate, isTeacherOrAdmin, createLesson);
router.put("/:id", authenticate, isTeacherOrAdmin, updateLesson);
router.delete("/:id", authenticate, isTeacherOrAdmin, deleteLesson);

export default router;
