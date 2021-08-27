import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error : ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
