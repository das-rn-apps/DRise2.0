// src/models/LiveClass.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ILiveClass extends Document {
    title: string;
    course?: mongoose.Types.ObjectId;
    instructor: mongoose.Types.ObjectId;
    startAt: Date;
    endAt?: Date;
    zoomMeetingId?: string;
    joinUrl?: string;
    description?: string;
}

const LiveClassSchema = new Schema<ILiveClass>(
    {
        title: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
        startAt: { type: Date, required: true },
        endAt: { type: Date },
        zoomMeetingId: { type: String },
        joinUrl: { type: String },
        description: { type: String }
    },
    { timestamps: true }
);

const LiveClassModel = mongoose.model<ILiveClass>("LiveClass", LiveClassSchema);
export default LiveClassModel;
