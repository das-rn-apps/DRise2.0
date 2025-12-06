// src/models/Notification.ts
import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    body: string;
    read: boolean;
    meta?: any;
}

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        body: { type: String },
        read: { type: Boolean, default: false },
        meta: { type: Schema.Types.Mixed }
    },
    { timestamps: true }
);

const NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema);
export default NotificationModel;
