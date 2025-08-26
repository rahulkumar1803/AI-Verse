import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true, required: true },
        emailAddress: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        imageUrl: { type: String }, // Add this line
        isPro: { type: Boolean, default: false, required: true },
        accumulatedWords: { type: Number, default: 0, required: true },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;