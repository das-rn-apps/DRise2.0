// src/routes/quiz.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createQuiz, getQuiz, submitQuiz } from "../controllers/quiz.controller.js";
import { isTeacherOrAdmin } from "../middleware/teacher.js";

const router = Router();

router.post("/", authenticate, isTeacherOrAdmin, createQuiz);
router.get("/:id", authenticate, getQuiz);
router.post("/:id/submit", authenticate, submitQuiz);

export default router;
