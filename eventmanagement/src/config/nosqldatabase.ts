import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    console.log(`MONGO_URI: ${MONGO_URI}`);
    console.log("Connecting to MongoDB");
    const mongoUri =
      process.env.MONGO_URI ||
      "mongodb+srv://remrrebasar:hkp65z2dvd8kfFcU@events.dawdi.mongodb.net/?retryWrites=true&w=majority&appName=Events";
    await mongoose.connect(mongoUri, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Hata durumunda süreci sonlandır
  }
};

export default connectDB;
