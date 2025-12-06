// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "student" | "teacher" | "admin";
    comparePassword: (candidate: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["student", "teacher", "admin"], default: "student" }
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const user = this as IUser;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
    const user = this as IUser;
    return bcrypt.compare(candidate, user.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
