import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.DB_URI}/${process.env.DB_NAME}`
    );
    console.log("DATABASE CONNECTION ESTABLISHED");
  } catch (err) {
    console.log("DATABASE CONNECTION FAILED: ", err);
    process.exit(1);
  }
};

export default connectDB;
