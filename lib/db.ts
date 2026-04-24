import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_MONGODB_URI || '';

export async function dbConnect() {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Failed to connect mongodb", error);
    throw error;
  }
}
