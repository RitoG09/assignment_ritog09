import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import mongoose from "mongoose";

export const connectMongo = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing");
    }
    await mongoose.connect(uri);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
  console.log("MongoDB connected");
};
