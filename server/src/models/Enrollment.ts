// src/models/Enrollment.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IEnrollment extends Document {
    user: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    enrolledAt: Date;
    progress?: number; // percent 0-100
    completedLessons?: mongoose.Types.ObjectId[];
}

const EnrollmentSchema = new Schema<IEnrollment>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        enrolledAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 },
        completedLessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }]
    },
    { timestamps: true }
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const EnrollmentModel = mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
export default EnrollmentModel;
