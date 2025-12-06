// src/routes/review.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { addReview, getReviewsForCourse } from "../controllers/review.controller.js";

const router = Router();

router.post("/", authenticate, addReview);
router.get("/course/:courseId", getReviewsForCourse);

export default router;
