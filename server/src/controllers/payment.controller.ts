// src/controllers/payment.controller.ts
import { Request, Response } from "express";
import PaymentModel from "../models/Payment.js";
import { createRazorpayOrder } from "../services/razorpay.service.js";

export const initiatePayment = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id;
    const { courseId, amount, currency = "INR", provider = "razorpay" } = req.body;
    const payment = new PaymentModel({ user: userId, course: courseId, amount, currency, provider, status: "created" });
    await payment.save();

    if (provider === "razorpay") {
        const order = await createRazorpayOrder(payment._id.toString(), amount);
        payment.providerPaymentId = order.id;
        await payment.save();
        res.json({ success: true, data: { payment, order } });
        return;
    }

    res.json({ success: true, data: payment });
};

export const confirmPayment = async (req: Request, res: Response): Promise<void> => {
    // Webhook/confirmation handler for provider (simplified)
    const { paymentId, provider, status } = req.body;
    const payment = await PaymentModel.findOne({ providerPaymentId: paymentId });
    if (!payment) { res.status(404).json({ success: false, message: "Payment not found" }); return; }
    payment.status = status === "success" ? "paid" : "failed";
    await payment.save();
    res.json({ success: true, data: payment });
};
