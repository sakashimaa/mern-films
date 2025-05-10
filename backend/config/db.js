import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Sucessfully connected to mongo db 👍");
  } catch (error) {
    console.error(`Error connecting to mongo db ❌: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
