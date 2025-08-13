import mongoose, { Document, Schema } from 'mongoose';
const UserSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true, require: true },
        emaiilAddress: {type: String, require:true},
        isPro: {type: Boolean , default: false,require:true},
        accumulatedWords: {type: Number, default:0,require:true},
    },
    {timestamps: true}
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;