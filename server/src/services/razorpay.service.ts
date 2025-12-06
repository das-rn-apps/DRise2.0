// src/services/razorpay.service.ts
import Razorpay from "razorpay";
import { config } from "../config/environment.js";

/**
 * Minimal razorpay helper. Ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in env for real usage.
 */
export const createRazorpayOrder = async (receiptId: string, amount: number) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
        // return a fake object for dev/testing
        return { id: `fake_order_${Date.now()}`, amount, currency: "INR" };
    }
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await rzp.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: receiptId
    });
    return order;
};
