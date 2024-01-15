import mongoose from "mongoose";
import { ENVConfig } from "../src/utils/Config";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(ENVConfig.mongoDbURL ?? "", {
      dbName: "portfolio",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
