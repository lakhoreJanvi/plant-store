import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName: "plant_store" });
  console.log("[DB] Connected");
}
