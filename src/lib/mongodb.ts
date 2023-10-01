import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
};
