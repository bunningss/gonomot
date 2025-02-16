import { getEnv } from "@/utils/get-env";
import mongoose from "mongoose";

export async function connectDb() {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    return;
  }

  if (connectionState === 2) {
    return;
  }

  try {
    await mongoose.connect(getEnv("DATABASE_URL"));
  } catch (err) {
    console.log(err);
    throw new Error("Error occurred while connecting to the database.");
  }
}
