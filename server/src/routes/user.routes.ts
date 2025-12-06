// src/routes/user.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { getProfile, updateProfile, getMyEnrollments, getAllUserProfile } from "../controllers/user.controller.js";
import { isTeacherOrAdmin } from "../middleware/teacher.js";

const router = Router();

router.get("/", authenticate, isTeacherOrAdmin, getAllUserProfile);
router.get("/me", authenticate, getProfile);
router.put("/me", authenticate, updateProfile);
router.get("/me/enrollments", authenticate, getMyEnrollments);

export default router;
