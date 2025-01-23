import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Connected to database")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
};

export default connectDB;
