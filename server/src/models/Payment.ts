// src/models/Payment.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
    user: mongoose.Types.ObjectId;
    course?: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    provider: string; // razorpay/stripe etc
    providerPaymentId?: string;
    status: "created" | "paid" | "failed" | "refunded";
    metadata?: any;
}

const PaymentSchema = new Schema<IPayment>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        provider: { type: String },
        providerPaymentId: { type: String },
        status: { type: String, enum: ["created", "paid", "failed", "refunded"], default: "created" },
        metadata: { type: Schema.Types.Mixed }
    },
    { timestamps: true }
);

const PaymentModel = mongoose.model<IPayment>("Payment", PaymentSchema);
export default PaymentModel;
