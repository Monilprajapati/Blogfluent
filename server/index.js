import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    optionSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/auth', authRoutes);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.PORT || 5000;
connectDB(username, password);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
