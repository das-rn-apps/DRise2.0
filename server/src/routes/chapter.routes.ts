// src/routes/chapter.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { getChapter, createChapter, updateChapter, deleteChapter } from "../controllers/chapter.controller.js";
import { isTeacherOrAdmin } from "../middleware/teacher.js";

const router = Router();

router.get("/", authenticate, getChapter);
router.post("/", authenticate, isTeacherOrAdmin, createChapter);
router.put("/:id", authenticate, isTeacherOrAdmin, updateChapter);
router.delete("/:id", authenticate, isTeacherOrAdmin, deleteChapter);

export default router;
