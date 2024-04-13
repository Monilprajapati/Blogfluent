import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import { serviceAccountKey } from "./blog-fluent-firebase-adminsdk-mixb1-d6155942fd.js";
import authRoutes from "./routes/authRoutes.js";
import publishBlogRoutes from "./routes/publishBlogRoutes.js";
import AWS from "aws-sdk";
import bodyParser from "body-parser";

dotenv.config();
const { DB_USERNAME, DB_PASSWORD } = process.env;
connectDB(DB_USERNAME, DB_PASSWORD);
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
// firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// s3
export const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", publishBlogRoutes);


// Port and server 
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
