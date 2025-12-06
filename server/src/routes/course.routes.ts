// src/routes/course.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createCourse, getCourses, getCourseBySlug, updateCourse, deleteCourse, enrollCourse } from "../controllers/course.controller.js";
import { isTeacherOrAdmin } from "../middleware/teacher.js";

const router = Router();

router.get("/", getCourses);
router.get("/slug/:slug", getCourseBySlug);
router.post("/", authenticate, isTeacherOrAdmin, createCourse);
router.put("/:id", authenticate, isTeacherOrAdmin, updateCourse);
router.delete("/:id", authenticate, isTeacherOrAdmin, deleteCourse);
router.put("/:id/enroll", authenticate, enrollCourse);

export default router;
