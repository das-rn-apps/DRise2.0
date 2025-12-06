// src/routes/notification.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createNotification, getUserNotifications, markAsRead } from "../controllers/notification.controller.js";
import { isAdmin } from "../middleware/admin.js";

const router = Router();

router.post("/", authenticate, isAdmin, createNotification);
router.get("/me", authenticate, getUserNotifications);
router.put("/:id/read", authenticate, markAsRead);

export default router;
