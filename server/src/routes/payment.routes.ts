// src/routes/payment.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { initiatePayment, confirmPayment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/initiate", authenticate, initiatePayment);
router.post("/confirm", confirmPayment); // webhook endpoint usually

export default router;
