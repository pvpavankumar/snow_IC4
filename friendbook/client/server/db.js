import mongoose from "mongoose";
let pending;
export async function connectDatabase() {
  if (!process.env.DATABASE) throw new Error("Database is not configured");
  if (mongoose.connection.readyState === 1) return;
  if (!pending) {
    pending = mongoose.connect(process.env.DATABASE, {
      serverSelectionTimeoutMS: 8000, maxPoolSize: 5, bufferCommands: false
    }).catch(error => { pending = null; throw error; });
  }
  await pending;
}
