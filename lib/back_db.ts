import mongoose from "mongoose";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

declare global {
  var mongoose:
    | {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.NEXT_MONGODB_URI || "";

let cached = global.mongoose ?? { conn: null, promise: null };

export async function dbConnect() {
  try {
    if (cached.conn) {
      console.log("Using existing mongodb connection");
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;
    console.log("New mongodb connection established");
    return cached.conn;
  } catch (error) {
    console.error("Failed to connect mongodb", error);
    throw error;
  }
}
