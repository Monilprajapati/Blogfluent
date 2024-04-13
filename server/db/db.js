import mongoose from "mongoose";

const connectDB = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.bqh1bbh.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("error while connecting to database", error);
  }
};

export default connectDB;
