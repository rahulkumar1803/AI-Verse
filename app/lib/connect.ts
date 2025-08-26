import mongoose from "mongoose";

let isConnected = false;

export default async function connect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    console.log("Connecting to MongoDB:", process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL as string);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
