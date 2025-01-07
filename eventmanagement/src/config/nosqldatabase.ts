import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    console.log(`MONGO_URI: ${MONGO_URI}`);
    console.log("Connecting to MongoDB");
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
